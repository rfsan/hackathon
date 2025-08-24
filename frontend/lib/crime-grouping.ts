export interface CrimeReport {
  id: string;
  userId: string; // WhatsApp number or user identifier
  longitude: number;
  latitude: number;
  crime_type: string;
  report_time: string;
  crime_id?: string | null;
}

export interface UserSession {
  userId: string;
  crime_id: string;
  firstReportTime: string;
  lastReportTime: string;
  reportCount: number;
  expiresAt: string;
}

class CrimeGroupingService {
  private userSessions: Map<string, UserSession> = new Map();
  private readonly SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds

  /**
   * Process a new crime report and determine if it should be grouped with existing reports
   * @param report The new crime report to process
   * @returns The crime_id to assign to this report
   */
  processReport(report: CrimeReport): string {
    const now = new Date();
    const reportTime = new Date(report.report_time);
    
    // Clean up expired sessions first
    this.cleanupExpiredSessions(now);
    
    const existingSession = this.userSessions.get(report.userId);
    
    if (existingSession && this.isSessionValid(existingSession, reportTime)) {
      // Extend existing session
      existingSession.lastReportTime = report.report_time;
      existingSession.reportCount++;
      existingSession.expiresAt = new Date(reportTime.getTime() + this.SESSION_DURATION_MS).toISOString();
      
      return existingSession.crime_id;
    } else {
      // Create new session
      const newCrimeId = this.generateCrimeId();
      const newSession: UserSession = {
        userId: report.userId,
        crime_id: newCrimeId,
        firstReportTime: report.report_time,
        lastReportTime: report.report_time,
        reportCount: 1,
        expiresAt: new Date(reportTime.getTime() + this.SESSION_DURATION_MS).toISOString()
      };
      
      this.userSessions.set(report.userId, newSession);
      return newCrimeId;
    }
  }

  /**
   * Check if a user session is still valid (within 1-hour window)
   */
  private isSessionValid(session: UserSession, currentReportTime: Date): boolean {
    const expiresAt = new Date(session.expiresAt);
    return currentReportTime <= expiresAt;
  }

  /**
   * Remove expired sessions to prevent memory leaks
   */
  private cleanupExpiredSessions(now: Date): void {
    for (const [userId, session] of this.userSessions.entries()) {
      if (new Date(session.expiresAt) < now) {
        this.userSessions.delete(userId);
      }
    }
  }

  /**
   * Generate a unique crime ID
   */
  private generateCrimeId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `crime-${timestamp}-${random}`;
  }

  /**
   * Get all active user sessions
   */
  getActiveSessions(): UserSession[] {
    const now = new Date();
    this.cleanupExpiredSessions(now);
    return Array.from(this.userSessions.values());
  }

  /**
   * Get session information for a specific user
   */
  getUserSession(userId: string): UserSession | undefined {
    return this.userSessions.get(userId);
  }

  /**
   * Manually expire a user session (for testing or admin purposes)
   */
  expireUserSession(userId: string): boolean {
    return this.userSessions.delete(userId);
  }

  /**
   * Get statistics about current sessions
   */
  getSessionStats(): {
    activeSessionsCount: number;
    totalReportsInSessions: number;
    averageReportsPerSession: number;
  } {
    const now = new Date();
    this.cleanupExpiredSessions(now);
    
    const sessions = Array.from(this.userSessions.values());
    const totalReports = sessions.reduce((sum, session) => sum + session.reportCount, 0);
    
    return {
      activeSessionsCount: sessions.length,
      totalReportsInSessions: totalReports,
      averageReportsPerSession: sessions.length > 0 ? totalReports / sessions.length : 0
    };
  }
}

// Export singleton instance
export const crimeGroupingService = new CrimeGroupingService();

// Helper function to simulate processing WhatsApp reports
export function processWhatsAppReport(
  userId: string,
  longitude: number,
  latitude: number,
  crime_type: string,
  reportTime?: string
): CrimeReport {
  const report: CrimeReport = {
    id: `report-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    userId,
    longitude,
    latitude,
    crime_type,
    report_time: reportTime || new Date().toISOString()
  };

  // Process the report and assign crime_id
  const crime_id = crimeGroupingService.processReport(report);
  report.crime_id = crime_id;

  return report;
}