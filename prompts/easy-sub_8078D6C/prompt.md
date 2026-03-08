You are decompiling an assembly function called `sub_8078D6C` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_80239A8`

```c
void sub_80239A8() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r5, r0
         ldr r7, [r5, #0x0]
         ldrb r6, [r5, #0x6]
         cmp r6, #0x0
         beq .Lba90
         ldrb r0, [r5, #0x1e]
         cmp r0, #0x0
         beq .L1812
         sub r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
     8mov r4, #0x0
         cmp r4, r6
         bhs .L4c37
     36lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         add r0, #0x2c
         add r1, r5, r0
         mov r0, #0xd
         ldrsb r0, [r5, r0]
         ldrh r2, [r1, #0x10]
         add r0, r2
         strh r0, [r1, #0x10]
         mov r0, #0xe
         ldrsb r0, [r5, r0]
         ldrh r2, [r1, #0x12]
         add r0, r2
         strh r0, [r1, #0x12]
         mov r0, r1
         bl DisplaySprite-0x4
         add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
         cmp r4, r6
         blo .L1e15
     14ldrb r0, [r5, #0x1e]
         cmp r0, #0x0
         beq .Lba90
         sub r0, #0x1
         strb r0, [r5, #0x1e]
         ldrb r0, [r5, #0x1d]
         cmp r0, #0x1
         beq .L7c61
         cmp r0, #0x1
         bgt .L6650
         cmp r0, #0x0
         beq .L7055
         b .Lba90
     46cmp r0, #0x2
         beq .L8c69
         cmp r0, #0x3
         beq .La480
         b .Lba90
     48lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         add r0, #0x2c
         add r1, r5, r0
         b .L9c77
     44lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         add r0, #0x2c
         add r1, r5, r0
         ldrh r0, [r1, #0x12]
         add r0, #0x2
         b .L9a76
     51lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         add r0, #0x2c
         add r1, r5, r0
         ldrh r0, [r1, #0x12]
         sub r0, #0x2
     68strh r0, [r1, #0x12]
     60mov r0, r1
         bl DisplaySprite-0x4
         b .Lba90
     53lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         add r0, #0x2c
         add r1, r5, r0
         ldrh r0, [r1, #0x10]
         add r0, #0x2
         strh r0, [r1, #0x10]
         mov r0, r1
         bl DisplaySprite-0x4
     5ldrb r0, [r5, #0x1c]
         cmp r0, #0x0
         beq .Lda104
         cmp r7, #0x0
         beq .Lda104
         ldrh r0, [r5, #0x12]
         add r0, #0xa
         strh r0, [r7, #0x10]
         ldrh r0, [r5, #0x14]
         strh r0, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
     92pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8078D6C
sub_8078D6C: @ 0x08078D6C
	push {r4, r5, lr}
	adds r4, r0, #0
	movs r5, #0
_08078D72:
	ldr r0, [r4, #0x64]
	ldr r1, [r4, #0x18]
	lsls r3, r5, #3
	adds r2, r4, #0
	adds r2, #0x24
	adds r2, r2, r3
	ldr r1, [r1]
	ldr r2, [r2]
	adds r1, r1, r2
	asrs r1, r1, #8
	strh r1, [r0, #0x10]
	ldr r1, [r4, #0x1c]
	adds r2, r4, #0
	adds r2, #0x28
	adds r2, r2, r3
	ldr r1, [r1]
	ldr r2, [r2]
	adds r1, r1, r2
	asrs r1, r1, #8
	strh r1, [r0, #0x12]
	bl DisplaySprite
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #7
	bls _08078D72
	movs r0, #1
	pop {r4, r5}
	pop {r1}
	bx r1
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
