You are decompiling an assembly function called `sub_8068748` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_805A424`

```c
bool32 sub_805A424(BuzzerProjectile *proj)
{
    s16 screenX, screenY;
    screenX = TO_WORLD_POS_RAW(I(proj->qPos.x), proj->region[0]) - gCamera.x;
    screenY = TO_WORLD_POS_RAW(I(proj->qPos.y), proj->region[1]) - gCamera.y;

    // TODO: This condition is weird, can we check it differently?
    if (!isBetween(screenX, 0, DISPLAY_WIDTH + 1) || !isBetween(screenY, 0, DISPLAY_HEIGHT + 1)) {
        return TRUE;
    }

    return FALSE;
}
```

```asm
         push {lr}
         ldr r2, [r0, #0x10]
         asr r2, #0x8
         ldrh r1, [r0, #0x0]
         lsl r1, #0x8
         add r2, r1
         ldr r3, [pc, #0x24] # REFERENCE_.L34
         ldr r1, [r3, #0x0]
         sub r2, r1
         ldr r1, [r0, #0x14]
         asr r1, #0x8
         ldrh r0, [r0, #0x2]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r3, #0x4]
         sub r1, r0
         lsl r1, #0x10
         lsr r1, #0x10
         lsl r2, #0x10
         lsr r2, #0x10
         cmp r2, #0xf0
         bhi .L3024
         cmp r1, #0xa0
         bls .L3827
     21mov r0, #0x1
         b .L3a28
         .word gCamera
     23mov r0, #0x0
     25pop {r1}
         bx r1
```

## `IsWorldPtActive`

```c
bool32 /* 0x0802C198 */ IsWorldPtActive(s32 worldX, s32 worldY) { return TRUE; }
```

```asm
         push {lr}
         mov r3, r1
         ldr r2, [pc, #0x24] # REFERENCE_.L2c
         ldr r1, [r2, #0x0]
         sub r0, r1
         ldr r1, [r2, #0x4]
         sub r3, r1
         add r0, #0x80
         mov r1, #0xf8
         lsl r1, #0x1
         cmp r0, r1
         bhi .L2820
         mov r0, r3
         add r0, #0x80
         cmp r0, #0x0
         blt .L2820
         mov r0, #0x90
         lsl r0, #0x1
         cmp r3, r0
         ble .L3023
     11mov r0, #0x0
         b .L3224
         .word gCamera
     19mov r0, #0x1
     21pop {r1}
         bx r1
```

## `sub_8010E04`

```c
void sub_8010E04(Player *p)
{
    s32 qWorldX;

    if (gCamera.unk6A != 0) {
        qWorldX = p->qWorldX + Q(gCamera.unk6A);
        p->qWorldX = qWorldX + Q(4.5);
    } else {
        if (gCamera.x == 0) {
            p->qWorldX -= Q(3.5);
        }

        p->qWorldX += Q(gCamera.unk6A);
    }
}
```

```asm
         push {r4, lr}
         mov r2, r0
         ldr r3, [pc, #0x18] # REFERENCE_.L20
         mov r1, r3
         add r1, #0x6a
         mov r4, #0x0
         ldrsh r0, [r1, r4]
         cmp r0, #0x0
         beq .L2417
         mov r1, r0
         lsl r1, #0x8
         ldr r0, [r2, #0x10]
         add r0, r1
         mov r1, #0x90
         lsl r1, #0x3
         b .L3a28
         .word gCamera
     8ldr r0, [r3, #0x0]
         cmp r0, #0x0
         bne .L3224
         ldr r0, [r2, #0x10]
         ldr r3, [pc, #0x14] # REFERENCE_.L44
         add r0, r3
         str r0, [r2, #0x10]
     19mov r4, #0x0
         ldrsh r1, [r1, r4]
         lsl r1, #0x8
         ldr r0, [r2, #0x10]
     15add r0, r1
         str r0, [r2, #0x10]
         pop {r4}
         pop {r0}
         bx r0
         .word 0xfffffc80
```

## `sub_8010E4C`

```c
void sub_8010E4C(Player *p)
{
    s32 qWorldX;

    if (gCamera.unk6A != 0) {
        qWorldX = p->qWorldX + Q(gCamera.unk6A);
        p->qWorldX = qWorldX + Q(4.0);
    } else {
        if (gCamera.x == 0) {
            p->qWorldX -= Q(4.0);
        }

        p->qWorldX += Q(gCamera.unk6A);
    }
}
```

```asm
         push {r4, lr}
         mov r2, r0
         ldr r3, [pc, #0x18] # REFERENCE_.L20
         mov r1, r3
         add r1, #0x6a
         mov r4, #0x0
         ldrsh r0, [r1, r4]
         cmp r0, #0x0
         beq .L2417
         mov r1, r0
         lsl r1, #0x8
         ldr r0, [r2, #0x10]
         add r0, r1
         mov r1, #0x80
         lsl r1, #0x3
         b .L3a28
         .word gCamera
     8ldr r0, [r3, #0x0]
         cmp r0, #0x0
         bne .L3224
         ldr r0, [r2, #0x10]
         ldr r3, [pc, #0x14] # REFERENCE_.L44
         add r0, r3
         str r0, [r2, #0x10]
     19mov r4, #0x0
         ldrsh r1, [r1, r4]
         lsl r1, #0x8
         ldr r0, [r2, #0x10]
     15add r0, r1
         str r0, [r2, #0x10]
         pop {r4}
         pop {r0}
         bx r0
         .word 0xfffffc00
```

## `sub_8051534`

```c
void sub_8051534() { }
```

```asm
         ldr r2, [pc, #0x14] # REFERENCE_.L18
         ldr r0, [r2, #0x0]
         ldr r1, [pc, #0x14] # REFERENCE_.L1c
         add r0, r1
         ldr r1, [pc, #0x14] # REFERENCE_.L20
         lsl r0, #0x17
         lsr r0, #0x17
         strh r0, [r1, #0xc]
         ldrb r0, [r2, #0x4]
         strh r0, [r1, #0xe]
         bx lr
         .hword 0x0
         .word gCamera
         .word 0xfffffb80
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8068748
sub_8068748: @ 0x08068748
	push {lr}
	adds r2, r0, #0
	ldrh r0, [r2, #0x18]
	subs r0, #1
	strh r0, [r2, #0x18]
	lsls r0, r0, #0x10
	cmp r0, #0
	bne _0806876E
	ldr r0, _08068774 @ =gCamera
	ldr r1, [r0, #0x18]
	ldr r0, [r0, #0x1c]
	adds r1, r1, r0
	asrs r1, r1, #1
	lsls r1, r1, #8
	str r1, [r2, #8]
	adds r0, r2, #0
	movs r1, #0x2b
	bl sub_80676D4
_0806876E:
	movs r0, #0
	pop {r1}
	bx r1
	.align 2, 0
_08068774: .4byte gCamera
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
