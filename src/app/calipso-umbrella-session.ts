export class CalipsoUmbrellaSession {
  constructor(public EAAHash: string,
              public uid:string){ }
}

/*
example data session

Miscellaneous
  Session Expiration (barring inactivity): 478 minute(s)
  Client Address: 84.89.248.200
  SSO Protocol: urn:oasis:names:tc:SAML:2.0:protocol
  Identity Provider: https://umbrellaid.org/idp/shibboleth
  Authentication Time: 2018-08-08T14:07:22.598Z
  Authentication Context Class: urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
  Authentication Context Decl: (none)

Attributes
  EAAHash: b0744680-2aa3-4b12-8627-95d23e5e4af9
  EAAKey: 85c15fd8-94db-4ee2-9799-6d639d4e8b7c
  persistent-id: https://umbrellaid.org/idp/shibboleth!https://calipsotest.cells.es/shibboleth!b0744680-2aa3-4b12-8627-95d23e5e4af9
  transient-id: AAdzZWNyZXQxKI1tCjc8mpDjdd+kmf4jQ5CaHFRK3zjlDmdObyxWUCb6DUtKSrAQ0jOYfScrJv0x17oyslUaKH/6wXHn/IhlfPQXYIuaipRde1a/qYIrfkeku1TDdjs+jhk8MDaeQJxZbb9yRcqRcoDIAShvvg==
  uid: acampsm
*/
