# Melhorias Futuras (Backlog)

Este documento guarda ideias, melhorias e débitos técnicos mapeados durante o desenvolvimento da API para serem implementados no futuro.

## Módulo de Templates e Contratos

- [ ] **Validação Estrita de Campos Dinâmicos:** Atualmente o endpoint de criação de contratos aceita o preenchimento (JSON) sem validar no back-end se os campos obrigatórios do template foram preenchidos ou se os tipos (number, string, etc) estão corretos. Implementar validação dinâmica baseada nos `ContractTemplateField` no momento do `POST /contracts`.
