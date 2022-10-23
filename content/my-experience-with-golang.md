---
title: "My Experience With Golang"
subtitle: "A reflection on my experience when learning Golang. No JavaScript with extra steps."
lead: "A reflection on my experience with Golang It's kind of worth learning after I realized it's statically typed, so I didn't need to learn TypeScript."
description: "A reflection on my experience with Golang It's kind of worth learning after I realized it's statically typed, so I didn't need to learn TypeScript."
cover:
  image: 'my-experience-with-golang.png'
  thumb: 'my-experience-with-golang.png'
  alt: 'My Experience With Golang cover image'
  caption: 'Free photo by <a href="https://go.dev/blog/go-brand">Go</a>'
createdAt: 2022-10-23T13:35:41Z
updatedAt: 2022-10-23T13:35:41Z
tags:
  - tech
  - golang
---

## Intro

I've been playing and learning JavaScript for a year, especially Vue.js, Nuxt.js and Express.js, but since then TypeScript has been fully embraced by many people while I was working on my thesis. Many tech stacks put out TypeScript versions like Vue 3, Nuxt 3, etc.

I have had a bad experience with typescript since then. It spits out a running code-blocking error. Many people say it's better than hours of debugging. Others say it improves the developer experience. I said, "Dang, it's hard to learn and, in the end, it just compiles to JavaScript again."

When I graduated, I started trying modern React with dirty TypeScript again. I put Any type in an effort to avoid errors. It worked, but it's just JavaScript with an extra step. Out of desperation, I left it. Then my friend told me about Golang Bootcamp. It's popular among devs, and it's free. I said, "Alright, let's see how popular and powerful Golang is."

## Bridge

Go is a weirdly awesome statically typed language. It is easy to learn if you already know JavaScript very well, as they have a lot of similarities and some concepts won’t be new to you, except concurrency, channels, and goroutine. I feel like a dang when debugging memory address variables.

The first thing I noticed about Go was its simplicity. When Go is compiled, it feels like a dynamic language. Though it has a runtime, unlike JavaScript, it is not an interpreted language and does not rely on any framework. It truly is the best of both worlds. but there is no complete framework in Go. You have to choose more performance, less features, or more features, less perfomance, which is kind of a good trade.

The second point was variables. The Go constant is a real constant; it can't be modified. While in JavaScript, it can be modified as long as you didn't try to reassign the variable. Because Go is a statically typed language, unused variables in Go will cause a compiler error.

The third point to discuss is functions. For example, Go functions can return zero or multiple values. In Go, you can also declare variables to be returned and then write "return" without specifying what to return. A function in JavaScript, on the other hand, must return a value. If you do not return a value, the function will return "undefined". When we need to return many values in JavaScript, we normally return an object.

## Outro

What can I say now? Go is a weirdly sweet language. It's robust, and it's near enough to JavaScript to make it much easier to comprehend for someone who knows JavaScript. No JavaScript with extra steps. I still have a long way to go before I can be half as good in Go as I am in JavaScript, but with constant practice I hope I will get there. Maybe I will update this if necessary. Alright, let me continue to "Go". Get out of here.
