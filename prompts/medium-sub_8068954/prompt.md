You are decompiling an assembly function called `sub_8068954` in ARMv4T from a Game Boy Advance game.

# Examples

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

## `sub_8051558`

```c
void sub_8051558() { }
```

```asm
         push {lr}
         ldr r0, [pc, #0x28] # REFERENCE_.L2c
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x28] # REFERENCE_.L30
         cmp r1, r0
         ble .L2619
         ldr r0, [pc, #0x24] # REFERENCE_.L34
         cmp r1, r0
         ble .L4026
         ldr r0, [pc, #0x24] # REFERENCE_.L38
         cmp r1, r0
         ble .L2619
         ldr r0, [pc, #0x20] # REFERENCE_.L3c
         mov r2, #0x1
         cmp r1, r0
         bgt .L2217
         mov r2, #0x0
     15cmp r2, #0x0
         beq .L4026
     5bl  sub_8050EE4-0x4
         b .L4427
         .word gCamera
         .word 0x527
         .word 0x28fb
         .word 0x301b
         .word 0x3647
     8bl  sub_8050FF0-0x4
     20pop {r0}
         bx r0
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

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8068954
sub_8068954: @ 0x08068954
	push {lr}
	adds r2, r0, #0
	ldr r1, [r2]
	ldr r0, _0806897C @ =sub_8066890
	cmp r1, r0
	beq _08068976
	ldr r3, _08068980 @ =gCamera
	ldr r0, [r3, #0x18]
	lsls r0, r0, #8
	ldr r1, [r2, #8]
	cmp r1, r0
	blt _08068974
	ldr r0, [r3, #0x1c]
	lsls r0, r0, #8
	cmp r1, r0
	ble _08068976
_08068974:
	str r0, [r2, #8]
_08068976:
	pop {r0}
	bx r0
	.align 2, 0
_0806897C: .4byte sub_8066890
_08068980: .4byte gCamera
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
