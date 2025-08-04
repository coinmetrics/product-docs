# Using LLMs

For customers wanting to use LLMs to access data we have built a proof-of-concept based on:

* Claude Desktop as the gateway to the LLM (Anthropic)
* A local MCP server "Python Runner"
* A docker container with Python and the python client API
* A detailed set of instructions in markdown format, to be provided as context to the LLM

The following safety mechanisms apply:

* CM API Key is only used in the docker container
* Docker container cannot access any local files
* Docker container has a fresh /tmp folder mapped to it
* Docker container is allowed to save a maximum of 5 files, e.g. visualizations or CSV files

{% embed url="https://www.youtube.com/watch?list=PLPifYASp1ytfbDo99ItOYi0evq35tYuGw&v=gku23llLGAY" %}

{% embed url="https://github.com/coinmetrics/tarte_tatin" %}

Detailed installation instructions are in the repo linked above.&#x20;

Note that the python code generated will always be a single script and it will be available under `output-files` when completed. The code will also run locally, i.e. it does not rely on the python runner or MCP server. This is useful if you want to build on top of what the LLM has built.&#x20;
