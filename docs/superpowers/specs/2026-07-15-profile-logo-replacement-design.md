# Profile and Logo Image Replacement Design

## Goal

Use `/Users/wanxiao/Desktop/图标/微信图片_20260708002352_75_2002.jpg` as the visual identity for all three requested locations:

- the profile card avatar
- the navigation bar logo
- the browser tab favicon

## Asset Strategy

Create one shared 512 × 512 WebP asset in `public/assets/images/` from the square source image. Preserve the full composition without cropping. Both the profile configuration and navigation bar configuration will reference this shared asset.

Generate dedicated 32 × 32 and 64 × 64 PNG favicon assets plus a multi-size `favicon.ico` from the same source. The site favicon configuration will continue to reference `/favicon/favicon.ico`, avoiding changes to layout or metadata behavior.

## Configuration Changes

- Update `profileConfig.avatar` to the shared public WebP path.
- Update `siteConfig.navbar.logo.value` to the same shared public WebP path.
- Keep the existing logo type, alt text, site title, and profile text unchanged.

## Compatibility and Error Handling

- Verify the source image exists and is readable before conversion.
- Keep square output dimensions to avoid distortion in rounded avatar and compact navbar containers.
- Use WebP for page assets and ICO/PNG for browser favicon compatibility.
- Do not modify unrelated gallery, article, friend, or generated images.

## Verification

- Run `pnpm check`.
- Load the local homepage and confirm the profile avatar and navbar logo display the new image.
- Confirm the browser tab favicon changes to the same image.
- Confirm there are no broken-image requests or new browser console errors related to the replaced assets.

## Out of Scope

- Changing profile text, site title, colors, layout, or image framing CSS.
- Replacing avatars used by friends, comments, sponsors, or article content.
