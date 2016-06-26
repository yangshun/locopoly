module.exports = {
  // Staging db
  //firebase: {
  //  serviceAccount: {
  //    "type": "service_account",
  //    "project_id": "locopoly-staging",
  //    "private_key_id": "faccd4a213a5c9a900adf99f9bab17d1f786c6b8",
  //    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1t2lmfOUMpYn2\nFHPqDcTo2ZSPQVpgwefpZ09H5sIalNEt73y27muslQPX/Z9/VmVih/IL+Hr0BSQL\n5PP+ofStWhOORvlE1zJP4YOmn2LxuYEJtvBDGUPEiBB5s/30tzIP4X3CqF/UfgXx\ng+3EeQlHCuCxkrAa4XWZS4skKfFesIqg8Z9cZZQjJTBwLeU6Zt9+eez7ChWrLOmt\n0eMcLS/s0zwNXMnXXYQdiTyZa5R5f2FoQT4Dr1G0MtQCBZ44wm/xnTAHqcDjVJXm\nxxtMFi5/0SKK2uhfu/sjEXaEB7FMVrjTLYQP6VTvdi9JMRqTmMk280pD9eozl2BB\n1tr5pHlnAgMBAAECggEAWC2qbdtJYrupmMoP/ZG07bE3j9SMwMsXeIFzTVbC9hck\n8n92K2bCxTqCZPtjvGz2QbvqTrjDIUqlVUhCxltc2goN10rFhwxOE8lBE0fgwZ/c\n6BPnvwexhNrp88TOBUQofOBVIHKIHhsRU0NLy71YLSswIbsmzcR+RmcMG/5mbCW4\nCifEG3D09c+Z+7Dfo2BONDhwlbOqUTSwwck7GKlJRl27q7/y+632wwD0fyRMMWXB\nLwDe53L8feR0/smwPemQjBL2PvmbY6owF6q4PvbiNpj7iDedt4GedWUKk4bKdhYc\neSBVHnWLbug1TZ4gdbPfFuSFA0EjMtH9X1nkxSXPsQKBgQD0XcaAnor6MrGDLpzv\ncKEUIjU+GXLqlPir4c0QevT+7vpoP9reJQKa/Bv5bIv0tgzcoaUuhh2UyXVymA8X\nAh4Cr6r+e6N7e8gG2SiYJxofqbYEZzTfE9tAAjarbKUTLPjaX+9wMcgO6v0rXpd4\nFypkhJUeUnpTmTIZCaMAJvIT8wKBgQC+Xhar5LGXpZ3HaFfkcmaFLY7hOTwb1VjB\ncI6Yn6u9JDyIL+EUYifCNcNNgq2Xgb7HIeC+Af1Q6eUbc3jtQYsVERqRnSfaGz2C\n+srNk1af+oN9kXBP+xRIP9m3ArPKwnu+zfD1Xl/KB9tFAjDPOm+syODWPzHElX3k\nmT2okVgFvQKBgQDL/vTVLoUqdONHdcRBBq8RlbUI0EnkltQ4+NktptebcnjMSnI1\n/IN+SnQ39munr8pw7OhuPDu5l6xaK6J9PKE88NU4eJJzZVQIk4SV8B6YzB5M8rNq\nfrMLbk2hMaNkrKhZ9Lh32rb97SHH8MFV2VDkdOHfXE8ONtdhm2/dkqWIDQKBgA/r\nvIepu7SMFFL+BgPEEZDny4BIkh9dy2t6J2LaT7mk0y8sme1jfCHA71GHMU9veW4c\nBji939qphRCzqpRlG+WqJYeyFggmqRFQOi/RN7hvchnJVRRLUlnshR/KKRE3DLRb\ncuCCgQ5bc9okocJjB73ymuMwK9BeFEZPDpoPdcYdAoGAe1Gx3RuTe2oCMG0ZdDd8\nj34gAK+rSXV1PhOm5VIkGOCCX5ADzPWi8vk3AtzZSvIfjn1BE7QqKMSlo9AXsbbC\ntGAAm2ZVPEcaIwKfXXNUtj8kxu0yEsyBpWPp/eEiE/9q5+a4bsTS6bxWaebGxHSr\nb2uE5dVQJWpuH6T7Fcv2q3o=\n-----END PRIVATE KEY-----\n",
  //    "client_email": "node-675@locopoly-staging.iam.gserviceaccount.com",
  //    "client_id": "108738883506629495176",
  //    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  //    "token_uri": "https://accounts.google.com/o/oauth2/token",
  //    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  //    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/node-675%40locopoly-staging.iam.gserviceaccount.com"
  //  },
  //  databaseURL: "https://locopoly-staging.firebaseio.com/"
  //},
  // Dev db
  firebase: {
    serviceAccount: {
      "type": "service_account",
      "project_id": "locopoly-a44b8",
      "private_key_id": "c50d6fe19b79c19efbcaf23b45e96a14fdf05e05",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4fsHlWkBIoHK9\n5qma+9ElAXaxrsg9G3LqyY6xxoHMTi9HO3W5QwiernnaZ9csAkwZmIdCwGYXFFvR\nXxDMk+MrdJb+c77d8fIXzuwlddQnfJoUKcAVouNWS5XXvqglStzwQ5AErxbwLvU7\nneJ6n76BKOeinpa+tnG8bnvKbsgdMJvPrUVurwPNBI9bpH99xW/l2V/CUEUMB24L\n5YUH8puxGy2ZS+R/vnTs/haKgaSioembjdfD+JkPVHkxt55RWnMsrXeRN4o+2UKa\nlwV/063rZXOAFVXWyiN4/fGt9f24lMsTYgmf92mwM3mBCvGfA+y61Pp2/S1IQG0q\nypsPAPdBAgMBAAECggEBAIgVV0eo7kmjr37LKMccfwPgtIAS/7ezC2yLBymx1gOw\nl8be4NKp0y3YXCDw/xGDEEbA7uQZrjPP3HnuuSFs498lvEorbdmfoIZXJm/rHXWS\nvsOol/pdj3oTfo8IHlaDhbvi2dPaofy/Zjt3FZqFQatbVJ/qgh5hzDrE86I5XHnK\nIqI1k8s9lzEFe0CrQq8eYsMDGlIEK3VoaQMxItMfqzNMbVawFX2jsTN0uJtN3mcY\njHw7ZicnhEtztVMKpAqpV5ET8lVzpQ6opudlY+W+A7gWuFTWNBPjgbNqOu4U2kAr\nGjDAVDXCFmHKHMt3OaGTD9ddrWSTHE6Y7o51puRl6lECgYEA8Iabi0TjnunqdEN0\n1Bb2BDRUs9vYDT8ut3XKVqFwY8XbXVIGDYyuOh7ymTE50vOGdKtbw1AskoLnE0DE\n3pMB9DLJsNl0iGnzuVmuzfJiBeERDMVwoSA7m6sFgD/IAQNaqTkJL5WhjSXlF+/3\npIQvtyGOXWJs/rWWy7czZfz1fkcCgYEAxF1XLTSRyKrxB63gC4TM04w0YTkn7O4a\n4IKbLmC7zbCzXXLRb8GtzBArPjjxFe5zaXlWOiUidNAhDK50P01pB0GutxksVp25\n7sN6tAJH5XtfOUWn5lWfzsDLetAcchQ/hX/3QVcXaZRH6BJ75gBjduTZiW52YEKF\nCoCuSjjDejcCgYByhHRcS7FgQRj6v/9I16HMgKnvdHWaYQG6IZ/zvSuIpXR7Kwls\nvBVb4M46t+BDGuVieQ/YnzyJiT/Bv+271xxwCxpSVEaSiHedQSDkN0oKaI04mmy0\nmmcnB7c3x6ZPLSymM1y3RjPDw04fJoau0qzxMU3aEnm4j/a7CX+0SEsOEwKBgQCO\nNSL7RAUIFHQ2IYAOF4DW+8S7XE9D0TR5v1xu+/NGhV+An7R5gQRCsrr+dvJx9Zxz\nmEIQHfCUNF6a9oSNi5wyeyjyxTJNEDElb0AfuT8kPHK74Ww07XGspAc4zBqtq2hN\nYF1KXq4/8fkZYrmD2mguJJI+a1cjY0lCT+rpKa63hQKBgQCdOJwWs77SJOkWX9t9\niPxkMPppg+pG3HqclFtJOGFwo50VKouvVV6Rlx3Hn50wFh76K6ae6TtMn+DO37EX\nsjrriLgY7FJzbGWSQOR+xND4mYF0LTlNH32qJmEwSrtIkxJK1tblvMbZ5S+YIut/\nwuFtd1zWe3gIY2LpMaQ97p1vLQ==\n-----END PRIVATE KEY-----\n",
      "client_email": "node-50@locopoly-a44b8.iam.gserviceaccount.com",
      "client_id": "104224059081257842459",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/node-50%40locopoly-a44b8.iam.gserviceaccount.com"
    },
    databaseURL: "https://locopoly-a44b8.firebaseio.com/"
  },
  messenger: {
    appSecret: "355ec3d660af725541f258cc5caa2fb8",
    validationToken: "whatever",
    pageAccessToken: "EAAZAMQLBZBTlgBALLC0tlHFzW0uwRKaMEK0MpdCaWlesWBwiNzsZCEihM9C1UgtGR2wd2qVGk8JjqxZCKLRVZCxSF9BLm04zOfWDsoVY2SCZBDlC25VFSInaoZC1cD30JRWm5syJuTLlScbKivK8FyVn6rbEfD89lnZBHjMqGvZAa3QZDZD"
  }
};
