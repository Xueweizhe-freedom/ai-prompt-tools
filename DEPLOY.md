# 部署指南

## 提交到 GitHub

### 方式一：HTTPS（需要密码/Token）

```bash
# 1. 确保在正确的目录
cd ai-prompt-hub

# 2. 添加远程仓库（如果还没添加）
git remote add origin https://github.com/Xueweizhe-freedom/ai-prompt-tools.git

# 3. 推送代码
# 会提示输入用户名和 Personal Access Token
git push -u origin main
```

**注意**：GitHub 已不支持密码登录，需要使用 Personal Access Token
- 生成 Token: GitHub Settings -> Developer settings -> Personal access tokens -> Tokens (classic)
- 权限勾选: `repo`

### 方式二：SSH（推荐）

```bash
# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your@email.com"

# 2. 添加公钥到 GitHub
# 复制 ~/.ssh/id_ed25519.pub 内容
# GitHub Settings -> SSH and GPG keys -> New SSH key

# 3. 修改远程仓库为 SSH
git remote set-url origin git@github.com:Xueweizhe-freedom/ai-prompt-tools.git

# 4. 推送
git push -u origin main
```

### 方式三：手动上传

1. 在 GitHub 创建新仓库: https://github.com/new
   - 仓库名: `ai-prompt-tools`
   - 选择 Public 或 Private

2. 压缩项目文件（排除 node_modules）

3. 在 GitHub 网页上传文件

## 部署到 Vercel（推荐）

### 自动部署

1. 将代码推送到 GitHub

2. 访问 https://vercel.com

3. 点击 "Add New Project"

4. 导入 GitHub 仓库 `ai-prompt-tools`

5. 配置:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. 点击 Deploy

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd ai-prompt-hub
vercel --prod
```

## 部署到 Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 部署
cd ai-prompt-hub
npm run build
netlify deploy --prod --dir=dist
```

## 部署到 GitHub Pages

```bash
# 安装 gh-pages
npm i -g gh-pages

# 添加部署脚本到 package.json
# "deploy": "gh-pages -d dist"

# 配置 vite.config.js
export default defineConfig({
  base: '/ai-prompt-tools/',
  // ...
})

# 构建并部署
npm run build
npm run deploy
```

## 环境变量配置

如果需要配置环境变量，创建 `.env` 文件：

```env
# 开发环境
VITE_APP_TITLE=AI Prompt Hub
VITE_APP_API_URL=http://localhost:3000

# 生产环境（Vercel/Netlify 中设置）
VITE_APP_API_URL=https://api.example.com
```

## 自定义域名

### Vercel 自定义域名

1. 在项目设置中找到 "Domains"
2. 添加你的域名
3. 按提示配置 DNS 记录

### 配置示例

```
# DNS 记录
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 持续集成 CI/CD

### GitHub Actions 配置

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 常见问题

### Q: 构建失败
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q: 路由 404
确保配置了路由回退:
- Vercel: 自动处理
- Netlify: 创建 `_redirects` 文件
- GitHub Pages: 使用 hash 路由

### Q: 资源路径错误
检查 `vite.config.js` 中的 `base` 配置是否与部署路径一致。
