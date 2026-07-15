# 导航栏标题修改设计

## 目标

将网页左上角导航栏中当前显示的“舌甘舌甘一笑”修改为“潇拾壹的博客”。

## 修改范围

- 修改 `src/config/siteConfig.ts` 中的 `siteConfig.navbar.title`。
- 新标题固定为“潇拾壹的博客”。
- 保留当前导航栏头像 Logo `/assets/images/profile-logo.webp`。
- 保留品牌区域返回首页的链接和现有交互效果。

## 明确不修改

- 不使用 `/Users/wanxiao/Downloads/xiaoshiyi-anime-neon-logo-v2.png`。
- 不修改 `src/components/layout/Navbar.astro` 的结构。
- 不修改全站 `siteConfig.title`，避免影响浏览器标题、SEO、RSS 等位置。
- 不修改个人介绍头像、favicon 或其他 Logo。
- 不调整导航栏高度、字体、颜色、间距和响应式断点。

## 验证

- 运行静态断言，确认 `navbar.title` 为“潇拾壹的博客”。
- 运行 `pnpm check` 和 `pnpm build`。
- 在本地网站检查桌面端与约 `375px` 手机宽度。
- 确认现有头像保留，新标题完整显示，右侧按钮和菜单没有被挤压。
