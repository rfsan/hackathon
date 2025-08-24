# Audio Playback Troubleshooting Guide

## Current Issue: OPUS files not playing in production

### Potential Causes & Solutions:

## 1. **CORS Policy Issue** ⚠️
**Problem**: Supabase Storage might not allow cross-origin requests from your domain.

**Solution**: Configure CORS in Supabase Dashboard:
1. Go to your Supabase project dashboard
2. Navigate to **Storage** → **Settings** → **CORS**
3. Add your production domain with these settings:
```json
{
  "allowedOrigins": ["*"],
  "allowedMethods": ["GET", "HEAD"],
  "allowedHeaders": ["*"],
  "maxAge": 3600
}
```

## 2. **File Path Structure** 📁
**Problem**: Files might be stored with different path structures.

**Current files in storage**:
- `c065bc4b-a69a-4514-a97f-fffdff80b82c/1755995752.opus`

**URLs being generated**:
- Primary: `https://llnotoljxkilousxtsdk.supabase.co/storage/v1/object/public/crime-reports/c065bc4b-a69a-4514-a97f-fffdff80b82c/1755995752.opus`
- Fallback: `https://llnotoljxkilousxtsdk.supabase.co/storage/v1/object/public/crime-reports/1755995752.opus`

## 3. **MIME Type Issue** 🎵
**Problem**: Files stored with `*/*` MIME type instead of proper audio MIME type.

**Browser requirements**:
- OPUS files need: `audio/ogg; codecs=opus` or `audio/ogg`
- Current storage shows: `*/*`

## 4. **Environment Variables** 🔧
**Make sure these are set in production**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://llnotoljxkilousxtsdk.supabase.co
SUPABASE_URL=https://llnotoljxkilousxtsdk.supabase.co
SUPABASE_API_KEY=your_api_key
```

## 5. **Browser Compatibility** 🌐
**OPUS support varies by browser**:
- ✅ Chrome: Full support
- ✅ Firefox: Full support  
- ⚠️ Safari: Limited support
- ❌ Edge (old): No support

## Debugging Steps:

### Step 1: Check Network Tab
1. Open Chrome DevTools → Network tab
2. Try to play audio
3. Look for failed requests (red entries)
4. Check response status codes

### Step 2: Use Debug Component
In development mode, you'll see a debug component that tests the URL accessibility:
1. Click "Test URL" button
2. Check console for error messages
3. Verify CORS headers

### Step 3: Try Proxy API Route
If CORS is the issue, files should work through the proxy:
- Direct: `https://yourapp.com/api/files/reportId/filename.opus`
- This bypasses CORS by serving files through your API

### Step 4: Test URLs Manually
Try accessing these URLs directly in your browser:
```
https://llnotoljxkilousxtsdk.supabase.co/storage/v1/object/public/crime-reports/c065bc4b-a69a-4514-a97f-fffdff80b82c/1755995752.opus
```

## Quick Fixes Applied:

1. **Multiple Source Tags**: Audio player tries 4 different URL combinations
2. **Fallback API Route**: `/api/files/[reportId]/[filename]` serves files through your server
3. **Better Error Handling**: Console logs show exact errors and URLs
4. **Debug Component**: Development-only component to test URLs

## Next Steps:
1. Check browser console for specific error messages
2. Verify CORS configuration in Supabase
3. Test the proxy API route
4. Consider converting OPUS files to MP3 for broader compatibility

## Production URLs to Test:
Replace `reportId` and `filename` with actual values from your database:
- Direct Storage: `https://llnotoljxkilousxtsdk.supabase.co/storage/v1/object/public/crime-reports/REPORT_ID/FILENAME.opus`
- Proxy API: `https://yourproductiondomain.com/api/files/REPORT_ID/FILENAME.opus`