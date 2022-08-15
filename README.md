# vue2-jsx-esbuild

work with vue2-jsx-esbuild， and just for vue2 jsx

## How To Use

at first, you have to use jsx in vue2 and esbuild-loader in webpack


in webpack rules

```javascript
...
module: {
  rules: [
      {
          test: /\.js$/,
          use: {
              loader: 'esbuild-loader',
              options: {
                  loader: 'jsx',
                  jsxFactory: 'vue2JsxEsbuild',
                  target: 'es2015'
              },
          }
      }
  ]
}
...
```

in webpack plugins


```javascript
plugins: [
  new webpack.ProvidePlugin({
      vue2JsxEsbuild: ["vue2-jsx-esbuild", "default"]
  })
]
```