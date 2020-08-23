---
layout: post
title: "How to write a good README"
date: "Aug 12, 2020"
categories: post
thumbnail: blog-documentation.jpg
summary: "How to write a good README using templates"
permalink: /how-to-write-a-good-readme
---
Our company has a staff restructure, and I ended up in the department with the most projects to maintain. When I naively grab a "simple" story to familiarise myself with an API, I notice that the README only said README, and my nightmare began... It didn't have any documentation.

I asked one of my peers who should know about that API, everything that I couldn't find by looking at the code, and for all my questions, I heard an "I don't know" only one person worked in that project, and it wasn't available anymore.

So the simple story transforms itself into an existential crisis about What was the propose of the API? How do we know it was working correctly? Where was located in the virtual realm of servers? And, if nobody knows about it, Can I delete it?

> "Documentation is like sex: when it is good, it is very, very good; and when it is bad, it is better than nothing."
>
> -- _Dick Brandon_

## What goes into the documentation?
Keep in mind that people access your documentation, usually for three different reasons:

- Local Development
- Deployment and Monitoring
- Usage and Troubleshooting

Local development not only means being able to run the project locally, but you also need to provide the project's context, common terminology, and general guidance on how to contribute.

Ensure everyone is clear about how to deploy to production and keep it that way, providing access to the tools needed for that: the pipeline, dashboards, alerting mechanisms, and access to the logs.

Lastly, let your clients know how to use your application, teach them how to use your functionality the expected behavior and which exceptions they should be aware of.

## The README cheat sheet

You are wellcome to copy and modify these templates at your convenience, these are the templates for an API project; please read the instructions on the template for clarity.

### README.md
```markdown
# Project Title
## Description
please describe the purpose of the project, why it adds value to the business, and the terminology the user will find (usually associated with the main classes).

![screenshot](img/screenshot)

## Contributing
- [How to contribute](CONTRIBUTING.md)

---

# Local Development
For almost all this section if better to provide command lines,
a line of code is worth a thousand words ;)

## Technology Stack
- [language Version](#)
- [framework Version](#)
- [building tool Version](#)

## Set Up
Need to set up a DB? Download a Docker Image? Configure an IDE?
\```bash
echo 'set variables'
\```

## Environment Variables
Script setting up the environment variables.
\```bash
echo 'set variables'
\```

## Build
How to build? does it need arguments or VM options?
\```bash
echo 'build'
\```

## Run Tests
Where they are and how to run them to ensure that the local environment is all set.
\```bash
echo 'test'
\```

---

# Deployment
Here is shown the architecture and external tools of the production and development environments.

## Architecture
Preferable, shows a diagram where is listed:
- Known clients
- Dependencies like Data Bases, Queues, etc.
- Cron Jobs

## Environments
Here are listed all the environments and provide access to the tools needed to manage them.
Let us use three environments as an example.

| Tools           | DEV               | STG               | PRD               |
| --------------- | ----------------- | ----------------- | ----------------- |
| Pipeline        | [Tool](#)         | [Tool](#)         | [Tool](#)         |
| Monitoring      | [Dashboard](#)    | [Dashboard](#)    | [Dashboard](#)    |
| Alerting        | [Tool](#)         | [Tool](#)         | [Tool](#)         |
| Troubleshooting | [Health Check](#) | [Health Check](#) | [Health Check](#) |

---

# User Guide
## Documentation
Documentation for the client
- [API Documentation](API.md)
or
- [Users Manual](www.wiki.com)

## Known issues
- [Issues tool](#)

---

# Authors
- [Code Monkey](mailto: codemonkey@cortes-gerardo.com)

```

### CONTRIBUTING.md

```markdown
# How to contribute

## Code Style
If you want people to follow name conventions and code guidelines, this is the place to tell them.

## Pull requests
Do you use GitFlow? Your commits follow some guidelines? Who reviews the code and pull requests?

## Report issues
Add access to where and how to report issues.
```

### API.md
```markdown
# API Documentation

## Getting Started
- **Base URL**: `http://www.example.com`
- **API Keys** / **Authentication**: include the format and how to acquire them.

## Error Handling
This is the contract for all the exceptions that the API will produce.
Be clear about the exception, so the client knows how to correct the request in case of 4XX or what to do with 5XX.
### Expected status codes:

|       HTTP status code | Details                                       |
| ---------------------: | --------------------------------------------- |
| **400** - Bad Request | describe which actions the client should take |

### Expected custom error codes:

| Custom error codes | Details                                       |
| -----------------: | --------------------------------------------- |
|        custom_code | describe which actions the client should take |

#### Example Response:
\```json
{
  "success": false,
  "message": "Unauthorized",
  "code": "custom_code"
}
\```

## Endpoints
Repeat the following section as needed, sorting by resource
### METHOD /resource/{{path_variable}}
Describe what the endpoint does

| Headers     | Type     | Description  |
| ----------- | -------- | ------------ |
| **header** | `string` | value/format |

| Path variables        | Type      | Description        |
| --------------------- | --------- | ------------------ |
| **var** _(required)_ | `integer` | description/format |

| Query parameters         | Type      | Description        |
| ------------------------ | --------- | ------------------ |
| **query** _(optional)_  | `string`  | description/format |

#### Example Request:
\```sh
curl http://www.example.com/resource/1 \
-X PATCH \
-H $HEADER \
-d $BODY
\```

#### Example Response:
\```json
{
  "success": true
}
\```

```

## Takeaways
Documentation makes your project a living being, capable of growing and improving itself without your intervention.

Think about how you want to inherit an old project and what knowledge you need to make a successful change in production. So, unless you test your documentation with someone else, you will not know what is missing, listen to the questions, and answer them in the README.
