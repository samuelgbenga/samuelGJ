import React from "react";
import ReactMarkdown from "react-markdown";

function SingleArticlePage() {
  const markdownContent = `
# Getting Started with React and Markdown

## Introduction
Welcome to this comprehensive guide on using React with Markdown! In this article, we'll explore how to create beautiful, interactive web applications using these powerful technologies.

## Why React and Markdown?
- **Easy to Learn**: React has a gentle learning curve
- **Component-Based**: Build reusable UI components
- **Rich Ecosystem**: Access to thousands of packages
- **Great Documentation**: Extensive community support

## Code Example
\`\`\`javascript
import React from 'react';

function HelloWorld() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

## Key Features
1. **Virtual DOM**: Efficient rendering
2. **One-way Data Flow**: Predictable state management
3. **JSX Syntax**: Write HTML in JavaScript
4. **Component Lifecycle**: Control component behavior

## Best Practices
> "The best way to predict the future is to implement it." - Alan Kay

### Tips for Success
- Start with small components
- Use functional components
- Implement proper error handling
- Write clean, maintainable code

## Conclusion
React and Markdown together provide a powerful combination for building modern web applications. By following best practices and staying up-to-date with the latest features, you can create amazing user experiences.

---

*Last updated: March 2024*
`;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <article className="prose prose-lg dark:prose-invert">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </article>
    </div>
  );
}

export default SingleArticlePage;
