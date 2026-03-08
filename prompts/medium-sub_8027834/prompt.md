You are decompiling an assembly function called `sub_8027834` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_80276A8`

```c
void sub_80276A8() { }
```

```asm
         push {lr}
         sub sp, #0x4
         lsl r0, #0x18
         lsr r3, r0, #0x18
         mov r1, sp
         mov r0, #0x38
         strb r0, [r1, #0x0]
         mov r0, #0x6
         strb r0, [r1, #0x1]
         ldr r0, [pc, #0x1c] # REFERENCE_.L30
         ldrb r1, [r0, #0x6]
         mov r2, r0
         cmp r1, #0x0
         bne .L3425
         add r0, #0xae
         ldrh r0, [r0, #0x0]
         cmp r0, #0x0
         bne .L3425
         mov r0, sp
         mov r1, r2
         add r1, #0x8e
         ldrb r1, [r1, #0x0]
         strb r1, [r0, #0x2]
         b .L3e30
         .word gStageData
     13mov r0, sp
         strb r3, [r0, #0x2]
         mov r0, r2
         add r0, #0x8e
         strb r3, [r0, #0x0]
     23mov r0, sp
         bl sub_8026AB8-0x4
         add sp, #0x4
         pop {r0}
         bx r0
```

## `sub_80276F4`

```c
void sub_80276F4() { }
```

```asm
         push {r4, lr}
         sub sp, #0x8
         lsl r0, #0x10
         lsl r1, #0x10
         lsr r4, r1, #0x10
         ldr r2, [pc, #0x34] # REFERENCE_.L40
         add r2, #0x8f
         mov r3, #0x1
         strb r3, [r2, #0x0]
         mov r3, sp
         mov r2, #0x28
         strb r2, [r3, #0x0]
         lsr r0, #0x8
         ldr r2, [sp, #0x0]
         ldr r3, [pc, #0x24] # REFERENCE_.L44
         and r2, r3
         orr r2, r0
         str r2, [sp, #0x0]
         mov r2, sp
         mov r0, #0xff
         and r4, r0
         strb r4, [r2, #0x3]
         lsr r1, #0x18
         strb r1, [r2, #0x4]
         mov r0, sp
         bl sub_8026AB8-0x4
         add sp, #0x8
         pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word gStageData
         .word 0xff0000ff
```

## `sub_8003DC4`

```c
void sub_8003DC4() { }
```

```asm
         push {lr}
         lsl r0, #0x10
         lsr r1, r0, #0x10
         ldr r0, [pc, #0x18] # REFERENCE_.L20
         mov r3, r0
         add r3, #0xb4
         ldrb r2, [r3, #0x0]
         add r0, r1, r2
         lsl r0, #0x10
         lsr r1, r0, #0x10
         cmp r1, #0xff
         bls .L2417
         mov r0, #0xff
         strb r0, [r3, #0x0]
         b .L2618
         .hword 0x0
         .word gStageData
     11strb r1, [r3, #0x0]
     14pop {r0}
         bx r0
```

## `sub_8001E58`

```c
s32 sub_8001E58()
{
    if (gStageData.gameMode != GAME_MODE_5 || gStageData.playerIndex == PLAYER_1) {
        if (sub_80020F0()) {
            return sub_8001FD4();
        }
    }

    return 0;
}
```

```asm
         push {lr}
         ldr r1, [pc, #0x1c] # REFERENCE_.L20
         ldrb r0, [r1, #0x3]
         cmp r0, #0x5
         bne .L108
         ldrb r0, [r1, #0x6]
         cmp r0, #0x0
         bne .L2415
     4bl  sub_80020F0-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         beq .L2415
         bl sub_8001FD4-0x4
         b .L2616
         .word gStageData
     7mov r0, #0x0
     13pop {r1}
         bx r1
```

## `sub_8020530`

```c
void sub_8020530(Player *p) { gStageData.taskCheese->main = sub_801F258; }
```

```asm
         ldr r0, [pc, #0x8] # REFERENCE_.Lc
         add r0, #0x98
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x8] # REFERENCE_.L10
         str r0, [r1, #0x8]
         bx lr
         .word gStageData
         .word sub_801F258
```

# Primary Objective

Decompile the following target assembly function from `asm/code_0_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8027834
sub_8027834: @ 0x08027834
	push {lr}
	sub sp, #4
	mov r1, sp
	movs r0, #0x38
	strb r0, [r1]
	movs r0, #0x23
	strb r0, [r1, #1]
	ldr r0, _08027858 @ =gStageData
	adds r0, #0xb4
	ldrb r0, [r0]
	strb r0, [r1, #3]
	mov r0, sp
	bl sub_8026AB8
	add sp, #4
	pop {r0}
	bx r0
	.align 2, 0
_08027858: .4byte gStageData
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
