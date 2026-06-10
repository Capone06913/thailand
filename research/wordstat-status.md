# Wordstat MCP — статус подключения

**Дата проверки:** 10.06.2026

## Результат

Wordstat через MCP-KV **не работает** в текущей среде:

```
SSL: CERTIFICATE_VERIFY_FAILED — Hostname mismatch,
certificate is not valid for 'api.wordstat.yandex.net'
```

## Что сделано вместо live Wordstat

1. Семантическое ядро собрано вручную по брифам ЯДрышко: `research/semantic-core-runs/thaipass-2026-06-10/`
2. Ключевые фразы для текстов сайта (оценочные, до перепроверки):
   - виза в таиланд
   - dtv виза таиланд / документы dtv
   - туристическая виза таиланд
   - срочная виза таиланд 3 дня
   - пенсионная виза таиланд 50

## Как починить Wordstat

1. Настроить API Key + Folder ID на [mcp-kv.ru/docs/wordstat-mcp-setup](https://mcp-kv.ru/docs/wordstat-mcp-setup)
2. Перезапустить Cursor
3. Запустить `/core` повторно для подтверждённых частотностей
