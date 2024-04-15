---
sidebar_position: 1
---

# Overview

**Posthoc** is a way to build quick-and-dirty visualisations ✨ for sequential decision-making algorithms, such as search algorithms 🚀.

![Alt text](image-1.png)

It's easy to get started.

1. Print logs in our **search trace** format
2. Load those into the Posthoc visualiser
3. Voila!

**Search trace** is log-like YAML format that describes what happened during your algorithm, and how you want to visualise it. If you're generating logs already, we invite you to convert them to **search traces**.

## Find and fix problems

### Interrogate decisions

Replay, step-through, and inspect the decisions of your algorithm. See your algorithm as a decision tree by annotating your log with `id` and `parentId` properties, or view it in context by including declarative rendering instructions.

![9 tile](image-2.png)

### Use built-in debugging tools

Posthoc is able to set breakpoints and even allows users to code one within the visualiser! This simplifies identifying and solving problems in algorithm logic or execution. By visually representing each step an algorithm takes, learners can quickly pinpoint where things go wrong or see how an algorithm progresses.

![A* debugging](debugging.png)

In the illustration provided, using the built-in debugger, users are able to set breakpoints on certain conditions, there is even an advance option where it could be useful when the provided breakpoints scenarios does not cover the needs of our users.

Creating visualisations are the best way to get your point across.

### Compare with a baseline

The Posthoc is able to visualise more than one trace at a time which enables users to be able to compare algorithms side by side which eases the users to see the difference between 2 or more algorithms or solutions.

![comparison between JPS and JPS2+](comparison.png)

In the illustration provided, we are able to see that Jump Point Search or JPS (left) for short is expands on more nodes compared to a newer version of it, JPS2+ (right).

## Collaborate and share

### Discuss ideas with your team

### Help students understand algorithms

### Share your work with the world

The Posthoc could be use as an learning tool in for learners' understanding of complex algorithms by providing a conducive environment for visualisation. Consider the example of the weighted [A\* search](https://en.wikipedia.org/wiki/A*_search_algorithm) problem. Students often find it challenging to conceptualize how various weights assigned to different grid cells or walkable paths can influence the algorithm's decision-making process. The Posthoc bridges this gap, enabling learners to visually comprehend the impact of these weights on the algorithm's pathfinding capabilities.

![weighted a star](educational.png)

In the illustration provided, the map is designed to mimic a video game environment, depicting a desert interspersed with patches of forest. The intensity of the green color indicates the weight of the walkable paths, with darker shades representing heavier weights. Through this visualization, it becomes evident how the A\* algorithm strategically selects a path from the source to the target. It does so by navigating through areas with the least amount of green, effectively avoiding paths with heavier weights to find the shortest and most efficient route. This visual demonstration not only clarifies the concept of weighted pathfinding but also showcases the algorithm's adeptness at incorporating path weights into its calculations, leading to an optimized solution.

## Why we built Posthoc

We're a team of optimisation researchers at Monash University.

We built Posthoc because, so often, we want visualise our algorithms so we can better understand them, but equally as often we're intimidated by cost-benefit ratio of employing them in our workflows.

Building visualisations is a lot of effort; we want to focus on writing and perfecting our algorithm, not coding up visualisers. So when our algorithms don't behave as expected, we'll tend to troubleshoot via debuggers, logs, and assertions.

Posthoc adds visualisation to our problem-solving toolkit 🛠️.

When problems occur in a spatial environment &mdash; navigating through roads, corridors, terrain etc &mdash; it's just natural to reason about them visually. Posthoc lets us create quick-and-dirty visualisations to leverage intuition, debug problems, draw insights, and collaborate with each other.

:::warning

This site is under construction. Content may be inaccurate or missing.

:::
