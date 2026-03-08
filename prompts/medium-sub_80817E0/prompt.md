You are decompiling an assembly function called `sub_80817E0` in ARMv4T from a Game Boy Advance game.

# Examples

## `TaskDestructor_Suction`

```c
void TaskDestructor_Suction(struct Task *t)
{
    Suction *suction = TASK_DATA(t);
    VramFree(suction->s2.tiles);

    if (suction->s.tiles) {
        VramFree(suction->s.tiles);
    }
}
```

```asm
         push {r4, lr}
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r0
         ldr r0, [r4, #0x34]
         bl VramFree-0x4
         ldr r0, [r4, #0xc]
         cmp r0, #0x0
         beq .L1a11
         bl VramFree-0x4
     9pop {r4}
         pop {r0}
         bx r0
```

## `TaskDestructor_IAChao`

```c
void TaskDestructor_IAChao(struct Task *t)
{
    IAChao *chao = TASK_DATA(t);

    VramFree(chao->vram);

    if (chao->someData) {
        EwramFree(chao->someData);
    }
}
```

```asm
         push {r4, lr}
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r0
         ldr r0, [r4, #0x68]
         bl VramFree-0x4
         ldr r0, [r4, #0x74]
         cmp r0, #0x0
         beq .L1a11
         bl EwramFree-0x4
     9pop {r4}
         pop {r0}
         bx r0
```

## `sub_807CB78`

```c
void sub_807CB78() { }
```

```asm
         push {r4, lr}
         mov r4, r0
         ldrh r0, [r4, #0xc]
         cmp r0, #0xa
         beq .L1812
         cmp r0, #0xa
         ble .L4a35
         cmp r0, #0x14
         beq .L4a35
         cmp r0, #0x64
         beq .L3e29
         b .L4a35
     4ldrh r0, [r4, #0x8]
         sub r0, #0x1
         strh r0, [r4, #0x8]
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L4a35
         mov r0, #0x14
         strh r0, [r4, #0xc]
         mov r0, r4
         mov r1, #0x0
         mov r2, #0xa
         bl sub_807DB00-0x4
         mov r0, r4
         mov r1, #0x1
         mov r2, #0xa
         bl sub_807DB00-0x4
         b .L4a35
     10mov r2, #0x0
         mov r1, #0x0
         mov r0, #0x1
         strh r0, [r4, #0x8]
         strh r1, [r4, #0xc]
         strb r2, [r4, #0x1]
     6pop {r4}
         pop {r0}
         bx r0
```

## `TaskDestructor_GoalRingImpl`

```c
void TaskDestructor_GoalRingImpl(struct Task *t)
{
    GoalRingImpl *ring = TASK_DATA(t);
    VramFree(ring->sprites[0].tiles);
    VramFree(ring->sprites[1].tiles);
}
```

```asm
         push {r4, lr}
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r0
         ldr r0, [r4, #0xc]
         bl VramFree-0x4
         ldr r0, [r4, #0x34]
         bl VramFree-0x4
         pop {r4}
         pop {r0}
         bx r0
```

## `TaskDestructor_ItemBoxMP`

```c
void TaskDestructor_ItemBoxMP(struct Task *t)
{
    ItemBoxMP *itembox = TASK_DATA(t);
    VramFree(itembox->sprBox.tiles);
    VramFree(itembox->sprItem.tiles);
}
```

```asm
         push {r4, lr}
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r0
         ldr r0, [r4, #0xc]
         bl VramFree-0x4
         ldr r0, [r4, #0x34]
         bl VramFree-0x4
         pop {r4}
         pop {r0}
         bx r0
```

# Declarations for the functions called from the target assembly

- `void VramFree(void *);`

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80817E0
sub_80817E0: @ 0x080817E0
	push {r4, lr}
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r4, r1, r0
	ldr r0, [r4, #0x18]
	cmp r0, #0
	beq _080817F8
	bl VramFree
	movs r0, #0
	str r0, [r4, #0x18]
_080817F8:
	adds r0, r4, #0
	bl sub_8081AA0
	adds r0, r4, #0
	bl sub_8081A40
	adds r0, r4, #0
	bl sub_808170C
	pop {r4}
	pop {r0}
	bx r0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
