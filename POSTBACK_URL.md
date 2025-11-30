# OGAds Postback URL Configuration

## Domain: addtok.com

### Postback URL for OGAds:

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&aff_sub4={aff_sub4}
```

### Full Postback URL (All Parameters):

```
https://addtok.com/api/postback?offer_id={offer_id}&offer_name={offer_name}&payout={payout}&session_ip={session_ip}&affiliate_id={affiliate_id}&aff_sub={aff_sub}&aff_sub2={aff_sub2}&aff_sub3={aff_sub3}&aff_sub4={aff_sub4}&aff_sub5={aff_sub5}&source={source}&date={date}&time={time}&datetime={datetime}&session_timestamp={session_timestamp}&ran={ran}
```

## Setup Instructions:

1. **Log in to OGAds Dashboard**: https://app.ogads.com
2. **Go to Settings → Postback**
3. **Add the postback URL above**
4. **Select**: Fire on "Conversion"
5. **Save**

## Test URLs:

- **Test Postback**: `https://addtok.com/api/postback?offer_id=123&offer_name=Test+Offer&payout=1.50&session_ip=127.0.0.1`
- **View Completions**: `https://addtok.com/api/completions`
- **Check Completion**: `https://addtok.com/api/check-completion?offer_id=123&ip=127.0.0.1`

## Important Notes:

- Make sure `addtok.com` domain is connected to your Vercel project
- Postback will only work after Vercel KV is set up (see VERCEL_KV_SETUP.md)
- Test the postback URL manually before configuring in OGAds

