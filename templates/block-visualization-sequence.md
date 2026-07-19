#### 📊 المخطط: {title}

#### ما هذا المخطط؟
> {description of the sequence — 1–3 sentences. Who interacts with whom? What is the order?}

#### المشاركون:
| # | الاسم | النوع | الدور |
| --- | --- | --- | --- |

#### تسلسل الخطوات:
| الخطوة | المرسل | المستقبل | الرسالة / الحدث | الملاحظات |
| --- | --- | --- | --- | --- |

```diagram
type: sequence
participants:
  - id: actor1
    label: {Actor A}
  - id: actor2
    label: {Actor B}
  - id: actor3
    label: {Actor C}
interactions:
  - step: 1
    from: actor1
    to: actor2
    message: {message or action}
    note: {optional note}
  - step: 2
    from: actor2
    to: actor3
    message: {message or action}
    note: {optional note}
  - step: 3
    from: actor3
    to: actor1
    message: {response or result}
    note: {optional note}
```
