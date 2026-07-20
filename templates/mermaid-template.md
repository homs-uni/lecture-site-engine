# Mermaid Diagram Templates for Software Engineering 2

> Comprehensive Mermaid examples for all diagram types used in Software Engineering lectures.
> Each diagram includes the code, explanation of elements, and application guidance.

---

## 1. Class Diagram (UML Class Diagram)

### Template & Example:

```mermaid
classDiagram
    class WeatherStation {
        -id: String
        -location: String
        -status: String
        +reportWeather()
        +powerSave()
        +remoteControl()
    }
    
    class WeatherData {
        -airTemperatures: float[]
        -groundTemperatures: float[]
        -windSpeeds: float[]
        +collect()
        +summarize()
    }
    
    class Instrument {
        -id: String
        +get()
        +test()
    }
    
    WeatherStation "1" --> "*" Instrument
    WeatherStation "1" --> "1" WeatherData
```

### Explanation:
- **WeatherStation**: Main class with properties and methods
- **WeatherData**: Data collection class
- **Instrument**: Base class for sensors
- **`-`** = private attribute
- **`+`** = public method
- **`"1" --> "*"`** = one-to-many relationship (1 station, many instruments)

### When to use:
- Explaining class structure and relationships
- Showing inheritance and composition
- Designing OOP systems
- Documenting data models

---

## 2. Component Diagram (System Architecture)

### Template & Example:

```mermaid
graph TB
    subgraph Management["Management Layer"]
        FM["Fault Manager"]
        CM["Configuration Manager"]
        PM["Power Manager"]
    end
    
    subgraph Communication["Communication"]
        CL["Communication Link"]
    end
    
    subgraph Sensors["Sensors Layer"]
        COMM["Communications"]
        DC["Data Collection"]
        INST["Instruments"]
    end
    
    FM --> CL
    CM --> CL
    PM --> CL
    
    CL --> COMM
    CL --> DC
    CL --> INST
```

### Explanation:
- **Management Layer**: High-level system managers
- **Communication Link**: Central hub connecting layers
- **Sensors Layer**: Data collection and transmission
- **Arrows**: Show dependencies and data flow

### When to use:
- System architecture explanation
- Layered system design
- Component relationships
- Showing hierarchical structure

---

## 3. Use Case Diagram

### Template & Example:

```mermaid
graph LR
    A["Operator"]
    B["Weather Station"]
    
    A -->|Report Weather| B
    A -->|Power Save| B
    A -->|Remote Control| B
    B -->|Collect Data| A
```

### Explanation:
- **Operator**: Actor/user
- **Weather Station**: System
- **Arrows**: Use cases (interactions between actor and system)

### When to use:
- Defining system requirements
- Showing user interactions
- Capturing functional requirements
- Use case analysis

---

## 4. Sequence Diagram (Interactions Over Time)

### Template & Example:

```mermaid
sequenceDiagram
    Operator->>Station: Start Collection
    activate Station
    Station->>Instruments: Request Data
    activate Instruments
    Instruments-->>Station: Send Readings
    deactivate Instruments
    Station->>WeatherData: Process & Store
    activate WeatherData
    WeatherData-->>Station: Stored OK
    deactivate WeatherData
    Station-->>Operator: Report Ready
    deactivate Station
```

### Explanation:
- **Solid arrows** (->>) = synchronous call (waits for response)
- **Dashed arrows** (-->) = response/return
- **activate/deactivate**: Shows when component is active
- **Order**: Top to bottom = chronological order

### When to use:
- Showing message flow between objects
- Explaining interaction sequences
- Timing and dependencies
- Protocol/workflow explanation

---

## 5. Flowchart (Process Flow)

### Template & Example:

```mermaid
graph TD
    Start([Start]) --> Init["Initialize System"]
    Init --> Collect["Collect Data from Instruments"]
    Collect --> Process["Process Data"]
    Process --> Decide{Error Detected?}
    Decide -->|Yes| Fault["Fault Manager"]
    Fault --> Report
    Decide -->|No| Report["Report Status"]
    Report --> Save["Save to Database"]
    Save --> Loop{Continue?}
    Loop -->|Yes| Collect
    Loop -->|No| End([End])
```

### Explanation:
- **Rectangles**: Process steps
- **Diamonds**: Decision points
- **Rounded**: Start/End
- **Arrows**: Flow direction
- **Labels on arrows**: Decision outcomes

### When to use:
- Algorithm steps
- Process workflows
- Decision trees
- System operations
- Error handling flows

---

## 6. Hierarchy/Tree Diagram

### Template & Example:

```mermaid
graph TD
    SDLC["SDLC Models"]
    SDLC --> Waterfall["Waterfall<br/>Sequential"]
    SDLC --> Iterative["Iterative<br/>Incremental"]
    SDLC --> Spiral["Spiral<br/>Risk-driven"]
    SDLC --> Agile["Agile<br/>Flexible"]
    
    Waterfall --> WF["All phases once<br/>High planning"]
    Iterative --> IT["Multiple releases<br/>Mid planning"]
    Spiral --> SP["Risk analysis<br/>Each cycle"]
    Agile --> AG["Sprints<br/>Adaptive"]
```

### Explanation:
- **Top-down structure**: Parent → children
- **Categories**: Types of SDLC models
- **Details**: Characteristics of each type

### When to use:
- Classification and taxonomy
- Hierarchical relationships
- Category breakdown
- Concept organization

---

## 7. Comparison Matrix (Visual Table)

### Template & Example:

```markdown
| Model | Duration | Flexibility | Risk | Best For |
| --- | --- | --- | --- | --- |
| **Waterfall** | Long | Low | High | Clear requirements |
| **Iterative** | Medium | Medium | Medium | Evolving requirements |
| **Spiral** | Long | Medium | Low | High-risk projects |
| **Agile** | Short | High | Low | Fast-changing needs |
```

### Explanation:
- **Rows**: Options being compared
- **Columns**: Comparison criteria
- **Content**: Specific values for each combination

### When to use:
- Comparing multiple approaches
- Trade-off analysis
- Feature comparison
- Requirements matrix

---

## 8. Cycle Diagram (Circular Process)

### Template & Example:

```mermaid
graph TB
    P1["Planning<br/>Week 1"]
    P2["Development<br/>Weeks 2-3"]
    P3["Testing<br/>Week 4"]
    P4["Deployment<br/>Week 5"]
    
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> P1
```

### Explanation:
- **Circular flow**: Process repeats
- **Phases**: Each iteration step
- **Duration**: Time for each phase

### When to use:
- Iterative processes
- Lifecycle phases
- Recurring workflows
- Agile sprints or iterations

---

## Best Practices for Mermaid Diagrams:

1. **Clarity over complexity**: Keep diagrams readable
2. **Labels matter**: Clear labels on all elements and relationships
3. **Consistent naming**: Use same terminology across diagrams
4. **Element explanation**: Always explain what elements mean
5. **Connection meaning**: Clarify what arrows/lines represent
6. **Purpose statement**: Start with "This diagram shows..."
7. **Real examples**: Use actual scenarios from the subject

---

## Integration with Custom Prompt:

Each diagram should follow this structure:

```markdown
#### 📊 المخطط: [Diagram Name]

```mermaid
[Mermaid code here]
```

**شرح العناصر:**
- **Element A**: [Explanation]
- **Element B**: [Explanation]

**شرح الروابط:**
- **Arrow from A to B**: [What it means]
```

---

## Mermaid Syntax Quick Reference:

| Type | Syntax | Use |
| --- | --- | --- |
| Class | `classDiagram class A {...}` | OOP structures |
| Flowchart | `graph TD ... -->` | Processes |
| Sequence | `sequenceDiagram A->>B:` | Interactions |
| Use Case | `A -->` | Actors & systems |
| Hierarchy | `graph TD A-->B` | Trees & categories |

---

## Remember:

**Every diagram must have:**
1. ✅ Clear title
2. ✅ Mermaid code block
3. ✅ Element explanations
4. ✅ Relationship explanations  
5. ✅ Context and application
