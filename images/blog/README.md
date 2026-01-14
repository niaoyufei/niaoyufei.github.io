# 博客图片文件夹

## 📸 如何添加图片到博客文章

### 方法一：单张图片
1. 将图片放入此文件夹（`public/images/blog/`）
2. 在文章中使用以下代码：

```html
<img src="/images/blog/你的图片名.jpg" alt="描述文字" />
```

### 方法二：多张图片并排显示
1. 将图片放入此文件夹
2. 在文章中使用以下代码：

```html
<div class="img-row">
    <img src="/images/blog/图片1.jpg" alt="描述1" />
    <img src="/images/blog/图片2.jpg" alt="描述2" />
    <img src="/images/blog/图片3.jpg" alt="描述3" />
</div>
```

### 示例

**单张图片：**
```html
<p>这是拼图前的效果：</p>
<img src="/images/blog/before-collage.jpg" alt="拼图前" />
```

**两张图片对比：**
```html
<div class="img-row">
    <img src="/images/blog/before.jpg" alt="拼图前" />
    <img src="/images/blog/after.jpg" alt="拼图后" />
</div>
```

**三张图片并排：**
```html
<div class="img-row">
    <img src="/images/blog/screenshot1.jpg" alt="功能1" />
    <img src="/images/blog/screenshot2.jpg" alt="功能2" />
    <img src="/images/blog/screenshot3.jpg" alt="功能3" />
</div>
```

## 📝 注意事项
- 支持的图片格式：jpg, jpeg, png, gif, webp
- 建议图片宽度：800-1200px（自动响应式缩放）
- 图片会自动添加圆角和边框样式
- 使用 `.img-row` 的图片会自动调整为相同高度

## 💡 提示
- 图片文件名建议使用英文和数字，避免中文
- 可以创建子文件夹来组织不同文章的图片
  例如：`public/images/blog/article-001/image1.jpg`
  引用时：`img src="/images/blog/article-001/image1.jpg" />`
<
