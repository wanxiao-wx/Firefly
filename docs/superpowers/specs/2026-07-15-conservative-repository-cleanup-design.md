# Firefly 保守清理设计

## 目标

清理本地 Firefly 仓库中可安全重建或确认无内容的文件与目录，同时保留依赖、文章原图、源码和内容数据。

## 删除范围

- `dist/`：生产构建产物，可通过 `pnpm build` 重建。
- `.astro/`：Astro 生成缓存，可在开发或构建时重建。
- `.playwright-cli/`：本地浏览器测试日志与页面快照。
- `output/`：本地 Playwright 测试截图。
- 仓库内除 `node_modules/` 外的 `.DS_Store` 文件。
- `src/content/posts/anime-new-power-vol1/images/` 至 `anime-new-power-vol140/images/`：共 140 个已确认为空的目录。
- `src/content/posts/code-geass-zero-requiem-review/`：已确认为空的目录。

## 保留范围

- `node_modules/`：保留，避免中断当前本地开发环境。
- `src/content/posts/tsubasa-artbook/images/` 与 `src/content/posts/tsubasa-nayi-nanian-naxieshier/images/`：包含约 286 MB 的有效文章原图。
- 所有 Git 跟踪的源码、配置、文章、公共资源和文档。
- 所有非空且用途未被证明为冗余的目录。

## 代码清理原则

本轮不删除源码。当前仓库未安装未使用代码分析工具，也没有足够证据证明具体模块、导出或依赖可以安全移除。代码瘦身应作为独立审计任务，在静态分析和完整构建验证后单独实施。

## 执行与验证

1. 删除上述明确范围内的目录和文件。
2. 确认 140 个动感新势力空 `images/` 目录数量归零。
3. 确认两组有效文章原图仍然存在。
4. 检查 `git status`，确保没有删除 Git 跟踪文件。
5. 运行 `pnpm check` 验证项目源码仍可正常诊断。

预计释放约 489 MB；实际数值以删除后的磁盘统计为准。
