You are decompiling an assembly function called `sub_80AE1C8` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_8056168`

```c
void sub_8056168() { }
```

```asm
         push {r4, lr}
         sub sp, #0x4
         ldr r0, [pc, #0x34] # REFERENCE_.L3c
         mov r2, #0x80
         lsl r2, #0x1
         mov r4, #0x0
         str r4, [sp, #0x0]
         mov r1, #0xc
         mov r3, #0x0
         bl TaskCreate-0x4
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         strh r4, [r0, #0x0]
         mov r1, #0x1
         strh r1, [r0, #0x2]
         strh r4, [r0, #0x4]
         mov r1, #0x80
         lsl r1, #0x3
         strh r1, [r0, #0x6]
         mov r1, #0xbf
         strh r1, [r0, #0x8]
         strh r4, [r0, #0xa]
         add sp, #0x4
         pop {r4}
         pop {r0}
         bx r0
```

## `CreateBoss_80581C8`

```c
struct Task *CreateBoss_80581C8(void *unk)
{
    sub_807B6C8(unk);

    return TaskCreate(sub_80581F0, 0, 0xF000, 0, NULL);
}
```

```asm
         push {lr}
         sub sp, #0x4
         bl sub_807B6C8-0x4
         ldr r0, [pc, #0x14] # REFERENCE_.L20
         mov r2, #0xf0
         lsl r2, #0x8
         mov r1, #0x0
         str r1, [sp, #0x0]
         mov r3, #0x0
         bl TaskCreate-0x4
         add sp, #0x4
         pop {r1}
         bx r1
         .hword 0x0
         .word sub_80581F0
```

## `sub_8056120`

```c
void sub_8056120() { }
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         mov r4, r0
         lsl r4, #0x10
         lsr r4, #0x10
         ldr r0, [pc, #0x38] # REFERENCE_.L44
         mov r2, #0x80
         lsl r2, #0x1
         mov r5, #0x0
         str r5, [sp, #0x0]
         mov r1, #0x10
         mov r3, #0x0
         bl TaskCreate-0x4
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         strh r4, [r0, #0xc]
         strh r5, [r0, #0x0]
         mov r1, #0x1
         strh r1, [r0, #0x2]
         strh r5, [r0, #0x4]
         mov r1, #0x80
         lsl r1, #0x3
         strh r1, [r0, #0x6]
         mov r1, #0xbf
         strh r1, [r0, #0x8]
         strh r5, [r0, #0xa]
         add sp, #0x4
         pop {r4, r5}
         pop {r0}
         bx r0
```

## `sub_80533F4`

```c
void sub_80533F4() { }
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         mov r4, r0
         lsl r4, #0x10
         lsr r4, #0x10
         ldr r0, [pc, #0x3c] # REFERENCE_.L48
         mov r2, #0x80
         lsl r2, #0x1
         mov r5, #0x0
         str r5, [sp, #0x0]
         mov r1, #0x10
         mov r3, #0x0
         bl TaskCreate-0x4
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         mov r1, #0x0
         strh r4, [r0, #0xc]
         strb r1, [r0, #0xe]
         strh r5, [r0, #0x0]
         mov r1, #0x1
         strh r1, [r0, #0x2]
         strh r5, [r0, #0x4]
         mov r1, #0x80
         lsl r1, #0x3
         strh r1, [r0, #0x6]
         mov r1, #0xbf
         strh r1, [r0, #0x8]
         strh r5, [r0, #0xa]
         add sp, #0x4
         pop {r4, r5}
         pop {r0}
         bx r0
```

## `CreateEntity_Interactable128`

```c
void CreateEntity_Interactable128(MapEntity *me, u16 regionX, u16 regionY, u8 id)
{
    struct Task *t = TaskCreate(Task_Interactable128, sizeof(IA127_128), 0x2100, 0, TaskDestructor_Interactable128);

    IA127_128 *ia = TASK_DATA(t);
    ia->base.regionX = regionX;
    ia->base.regionY = regionY;
    ia->base.me = me;
    ia->base.meX = me->x;
    ia->base.id = id;
    ia->worldX = TO_WORLD_POS(ia->base.meX, ia->base.regionX);
    ia->worldY = TO_WORLD_POS(me->y, ia->base.regionY);
    SET_MAP_ENTITY_INITIALIZED(me);
}
```

```asm
         push {r4, r5, r6, lr}
         mov r6, r8
         push {r6}
         sub sp, #0x4
         mov r8, r0
         mov r4, r1
         mov r5, r2
         mov r6, r3
         lsl r4, #0x10
         lsr r4, #0x10
         lsl r5, #0x10
         lsr r5, #0x10
         lsl r6, #0x18
         lsr r6, #0x18
         ldr r0, [pc, #0x54] # REFERENCE_.L74
         mov r2, #0x84
         lsl r2, #0x6
         ldr r1, [pc, #0x54] # REFERENCE_.L78
         str r1, [sp, #0x0]
         mov r1, #0x18
         mov r3, #0x0
         bl TaskCreate-0x4
         ldrh r2, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r2, r0
         strh r4, [r2, #0x4]
         strh r5, [r2, #0x6]
         mov r0, r8
         str r0, [r2, #0x0]
         ldrb r0, [r0, #0x0]
         strb r0, [r2, #0xa]
         strb r6, [r2, #0xb]
         ldrb r1, [r2, #0xa]
         lsl r1, #0x3
         ldrh r0, [r2, #0x4]
         lsl r0, #0x8
         add r1, r0
         str r1, [r2, #0xc]
         mov r0, r8
         ldrb r1, [r0, #0x1]
         lsl r1, #0x3
         ldrh r0, [r2, #0x6]
         lsl r0, #0x8
         add r1, r0
         str r1, [r2, #0x10]
         mov r1, #0x2
         neg r1, r1
         mov r0, r1
         mov r1, r8
         strb r0, [r1, #0x0]
         add sp, #0x4
         pop {r3}
         mov r8, r3
         pop {r4, r5, r6}
         pop {r0}
         bx r0
         .word Task_Interactable128
         .word TaskDestructor_Interactable128
```

# Primary Objective

Decompile the following target assembly function from `asm/code_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80AE1C8
sub_80AE1C8: @ 0x080AE1C8
	push {lr}
	sub sp, #4
	ldr r0, _080AE1FC @ =sub_80ADCF8
	movs r2, #0x80
	lsls r2, r2, #1
	ldr r1, _080AE200 @ =sub_80AE208
	str r1, [sp]
	movs r1, #0x9c
	movs r3, #0
	bl TaskCreate
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r1, r1, r0
	movs r0, #0
	strb r0, [r1]
	strh r0, [r1, #2]
	movs r0, #0xbe
	lsls r0, r0, #8
	str r0, [r1, #4]
	ldr r0, _080AE204 @ =0xFFFFD800
	str r0, [r1, #8]
	add sp, #4
	pop {r0}
	bx r0
	.align 2, 0
_080AE1FC: .4byte sub_80ADCF8
_080AE200: .4byte sub_80AE208
_080AE204: .4byte 0xFFFFD800
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
