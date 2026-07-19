#### 📊 المخطط: {title}

#### ما هذا المخطط؟
> {description of the hierarchy — 1–3 sentences. What is at the root? How does it branch?}

#### العُقد (Nodes):
| ID | الاسم | المستوى | النوع | الشرح |
| --- | --- | --- | --- | --- |

#### الروابط الهرمية:
| الأب | الابن | نوع العلاقة | الملاحظات |
| --- | --- | --- | --- |

```diagram
type: tree
root:
  id: root
  label: {Root node name}
  description: {what is it?}
branches:
  - parent_id: root
    children:
      - id: child1
        label: {Child 1 name}
        description: {what is it?}
      - id: child2
        label: {Child 2 name}
        description: {what is it?}
  - parent_id: child1
    children:
      - id: grandchild1
        label: {Grandchild name}
        description: {details}
```
