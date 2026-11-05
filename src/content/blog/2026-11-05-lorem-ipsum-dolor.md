---
title: "lorem ipsum dolor sit amet, consectetur adipiscing"
date: 2026-11-05
summary: "Sample post showing every kind of block a post can use. Replace it with a real one, or set draft to false to see it on the live site."
draft: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Here's a [link to a paper](https://arxiv.org/abs/1706.03762) and some `inline_code()`.

## tl;dr

- **lorem ipsum**: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
- **ut enim ad minim**: veniam, quis nostrud exercitation ullamco laboris nisi
- **duis aute irure**: dolor in reprehenderit in voluptate velit esse cillum dolore[^1]

## the problem

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

```python
import torch

def set_seed(seed: int) -> None:
    # Every source of randomness, pinned in one place.
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    return None
```

### a smaller heading

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

1. Ut enim ad minima veniam, quis nostrum exercitationem
2. Quis autem vel eum iure reprehenderit qui in ea voluptate
3. At vero eos et accusamus et iusto odio dignissimos

## try it

An interactive piece sits in a post on its own line. This one is the example in `src/components/blog/`.

::demo{name="example"}

| run | seed | loss |
| --- | --- | --- |
| baseline | 0 | 2.41 |
| fixed seeds | 0 | 2.38 |
| fixed seeds | 1 | 2.38 |

![Lorem ipsum caption for a photo](/me/great-minds-in-stem/01-dusk-over-the-city.jpg)

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

---

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

[^1]: Footnotes look like this. Lorem ipsum dolor sit amet.
