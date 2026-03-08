You are decompiling an assembly function called `sub_80AE3D4` in ARMv4T from a Game Boy Advance game.

# Examples

## `TaskDestructor_BigAirBubble`

```c
void TaskDestructor_BigAirBubble(struct Task *t)
{
    BigAirBubble *bubble = TASK_DATA(t);
    VramFree(bubble->s.tiles);
}
```

```asm
         push {lr}
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         ldr r0, [r0, #0x14]
         bl VramFree-0x4
         pop {r0}
         bx r0
```

## `TaskDestructor_AccordionSpring`

```c
void TaskDestructor_AccordionSpring(struct Task *t)
{
    AccordionSpring *spring = TASK_DATA(t);
    VramFree(spring->s.tiles);
}
```

```asm
         push {lr}
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         ldr r0, [r0, #0x14]
         bl VramFree-0x4
         pop {r0}
         bx r0
```

## `TaskDestructor_YadokkProjectile`

```c
void TaskDestructor_YadokkProjectile(struct Task *t)
{
    YadokkProjectile *proj = TASK_DATA(t);
    VramFree(proj->s.tiles);
}
```

```asm
         push {lr}
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         ldr r0, [r0, #0x14]
         bl VramFree-0x4
         pop {r0}
         bx r0
```

## `TaskDestructor_805FAC4`

```c
void TaskDestructor_805FAC4(struct Task *t)
{
    GuardProj *proj = TASK_DATA(t);
    VramFree(proj->s.tiles);
}
```

```asm
         push {lr}
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         ldr r0, [r0, #0x18]
         bl VramFree-0x4
         pop {r0}
         bx r0
```

## `TaskDestructor_GinpeProjectile`

```c
void TaskDestructor_GinpeProjectile(struct Task *t)
{
    GinpeProjectile *proj = TASK_DATA(t);
    VramFree(proj->s.tiles);
}
```

```asm
         push {lr}
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         ldr r0, [r0, #0x18]
         bl VramFree-0x4
         pop {r0}
         bx r0
```

# Declarations for the functions called from the target assembly

- `void VramFree(void *);`

# Primary Objective

Decompile the following target assembly function from `asm/code_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80AE3D4
sub_80AE3D4: @ 0x080AE3D4
	push {lr}
	ldrh r0, [r0, #6]
	movs r1, #0xc0
	lsls r1, r1, #0x12
	adds r0, r0, r1
	ldr r0, [r0, #0x14]
	bl VramFree
	pop {r0}
	bx r0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
