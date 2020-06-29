# Representation State Transfer (REST)

Representations (a.k.a. resources) are transferred over to an application state from the server.

REST is also stateless, meaning that no information from the client's session is stored. This provides a variety of benefits:

- State isn't managed by the server, so millions of the same request can be made across multiple different servers
- Less complexity involved as there is no synchronisation logic on the server side
- All necessary information sent from client, server doesn't have to know where in the application the client is

# 6 Design Principles

| Principle      | Sub-Principle              | Information                                                                                     |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| Resource       | Identifiers                | Key business decisions, what entities are going to be involved                                  |
|                |                            | URIs should be unique to each entity and/or per collection                                      |
|                |                            | <ul><li>`domain.com/collection/`</li><li>`domain.com/collection/entity`</li></ul>               |
|                | Hierarchy                  | Connections between entities and grouping them logically. HATEOAS for navigation                |
|                | Representation             | Data representation of returned resource (JSON, XML, SOAP etc)                                  |
| HTTP           | Semantics and Status Codes | [Status Codes and Messages](#status_codes)                                                      |
|                | Methods                    | [HTTP Methods](#methods)                                                                        |
| Versioning     |                            | Versioning can be done in three different ways:                                                 |
|                |                            | Add the versions as part of the URI                                                             |
|                |                            | <ul><li>`api/v1/examples` vs `api/v2/examples`</li></ul>                                        |
|                |                            | Getting API versions from Query Parameters                                                      |
|                |                            | <ul><li>`api/examples?v=1` vs `api/examples?v=2`</li></ul>                                      |
|                |                            | Adding the version in the Request Headers                                                       |
|                |                            | <ul><li>`x-api-version=1` vs `x-api-version=2`</li></ul>                                        |
| URL Anatomy    |                            | `https://example.com:443/api/orders?page=2&filter=shoe`                                         |
|                | Protocol                   | Rules for transmitting data between devices - http(s)                                           |
|                | Domain                     | Website name - example.com                                                                      |
|                | Port                       | Communication endpoint - (:)443                                                                 |
|                | Resource Path              | Path where resource is located - /api/orders                                                    |
|                | Query Parameters           | Used for filtering, sorting, pagination etc - ?page=2&filter=shoe                               |
| HATEOAS        |                            | Hypertext As The Engine Of Application State                                                    |
|                |                            | Represents relationship between resources via links                                             |
|                |                            | <ul><li>Contains related resource information</li><li>Resource links allow navigation</li></ul> |
| Authentication |                            | Verification of a user vs verification that the user has rights to a resource or action         |
|                | API Keys                   | [API Keys](#api_keys)                                                                           |
|                | OAuth Tokens               | [OAuth Tokens](#oauth)                                                                          |
|                | JWT Tokens                 | [JWT Tokens](#jwt)                                                                              |

## <a name='status_codes' href='#'>Status Codes and Messages</a>

| code | message                |
| ---- | ---------------------- |
| 1xx  | Informational messages |
| 2xx  | Success Messages       |
| 3xx  | Redirection Messages   |
| 4xx  | Client Error Messages  |
| 5xx  | Server Error Messages  |

## <a name='methods'>HTTP Methods</a>

| method | idempotent   | code                                                  | safe |
| ------ | ------------ | :---------------------------------------------------- | :--: |
| GET    | LOOK THIS UP | 200 (okay)                                            | YES  |
|        |              | 404 (not found)                                       |      |
| POST   |              | 201 ( created)                                        |  NO  |
|        |              | 400 (bad request)                                     |      |
| PUT    |              | 201 (created)                                         |  NO  |
|        |              | 204 (no content) OR 200 (okay)                        |      |
|        |              | 409(conflict)                                         |      |
| PATCH  |              | 204 (no content) OR 400(bad request) OR 409(conflict) |  NO  |
| DELETE |              | 204 (no content) OR 400(bad request)                  |  NO  |

## <a name='api_keys'>API Keys</a>

| Auth Type | Notes                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ |
| API Keys  | Consists of a long random string                                                                 |
|           | Should be included as part of the request headers - e.g. Authorization {key}                     |
|           | Public and Private Keys                                                                          |
|           | <ul><li>Pub keys can be shared</li><li>Pri keys are for server-to-server communication</li></ul> |

## <a name='oauth'>OAuth Tokens</a>

| Auth Type    | Notes                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| OAuth Tokens | Open Authentication Standard, Access Token                                            |
|              | App sends an application key and a secret to an authentication server                 |
|              | Once authenticated against the server, an access token is provided                    |
|              | <ul><li>Access tokens provide permissions</li><li>Used to make API requests</li></ul> |

## <a name='jwt'>JWT Tokens</a>

| Auth Type  | Notes                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JWT Tokens | JSON Web Token, base64 encoded version of the following data, separated by dots:                                                                                          |
|            | <ul><li>Header - defines hashing algorithm</li><li>Payload - expiry, issued at time, public claims</li><li>Signature - hash of the header, payload and a secret</li></ul> |

# _NB_ GraphQL

GraphQL makes it easier to query data multiple endpoints at the same time without having to do three separate queries and then cherry-pick information that is actually needed. It is not a replacement for REST, it stands as a proxy between the application and the API
