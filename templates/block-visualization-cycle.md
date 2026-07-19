#### 📊 المخطط: {title}

#### ما هذا المخطط؟
> {description of the cycle — 1–3 sentences}

#### وصف المراحل:
| # | المرحلة | الدخل | الخرج | الملاحظات |
| --- | --- | --- | --- | --- |

#### وصف الروابط:
| من | إلى | الشرط / الحافة | الملاحظات |
| --- | --- | --- | --- |

```diagram
type: cycle
stages:
  - id: stage1
    label: {stage name}
    description: {what happens}
  - id: stage2
    label: {stage name}
    description: {what happens}
  - id: stage3
    label: {stage name}
    description: {what happens}
relationships:
  - from: stage1
    to: stage2
    label: {condition/trigger}
  - from: stage2
    to: stage3
    label: {condition/trigger}
  - from: stage3
    to: stage1
    label: {loops back condition}
```
