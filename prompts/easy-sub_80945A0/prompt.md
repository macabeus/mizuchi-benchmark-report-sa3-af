You are decompiling an assembly function called `sub_80945A0` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_8050B14`

```c
void sub_8050B14() { }
```

```asm
         push {r4, lr}
         ldr r1, [pc, #0x48] # REFERENCE_.L4c
         mov r0, #0x0
         strh r0, [r1, #0x0]
         strh r0, [r1, #0x2]
         strh r0, [r1, #0xc]
         strh r0, [r1, #0xe]
         ldr r0, [pc, #0x40] # REFERENCE_.L50
         mov r12, r0
         mov r1, r12
         add r1, #0xc4
         ldr r0, [pc, #0x3c] # REFERENCE_.L54
         str r0, [r1, #0x0]
         add r1, #0x8
         ldr r0, [pc, #0x38] # REFERENCE_.L58
         str r0, [r1, #0x0]
         mov r0, r12
         add r0, #0xe6
         mov r3, #0x20
         strh r3, [r0, #0x0]
         add r0, #0x2
         mov r1, #0x40
         strh r1, [r0, #0x0]
         ldr r2, [pc, #0x2c] # REFERENCE_.L5c
         ldr r0, [pc, #0x2c] # REFERENCE_.L60
         strh r0, [r2, #0x6]
         ldr r0, [pc, #0x2c] # REFERENCE_.L64
         mov r4, r12
         str r0, [r4, #0x4]
         ldr r0, [pc, #0x2c] # REFERENCE_.L68
         str r0, [r4, #0xc]
         strh r3, [r4, #0x26]
         strh r1, [r4, #0x28]
         ldr r0, [pc, #0x28] # REFERENCE_.L6c
         strh r0, [r2, #0x0]
         pop {r4}
         pop {r0}
         bx r0
         .word gBgScrollRegs
         .word gUnknown_03001D80
         .word 0x6008000
         .word 0x600a000
         .word gBgCntRegs
         .word 0x940a
         .word 0x600c000
         .word 0x600e000
         .hword 0x9c0e
```

## `sub_8050864`

```c
void sub_8050864() { }
```

```asm
         push {r4, lr}
         ldr r1, [pc, #0x48] # REFERENCE_.L4c
         mov r0, #0x0
         strh r0, [r1, #0x0]
         strh r0, [r1, #0x2]
         strh r0, [r1, #0xc]
         strh r0, [r1, #0xe]
         ldr r0, [pc, #0x40] # REFERENCE_.L50
         mov r12, r0
         mov r1, r12
         add r1, #0xc4
         ldr r0, [pc, #0x3c] # REFERENCE_.L54
         str r0, [r1, #0x0]
         add r1, #0x8
         ldr r0, [pc, #0x38] # REFERENCE_.L58
         str r0, [r1, #0x0]
         mov r0, r12
         add r0, #0xe6
         mov r3, #0x20
         strh r3, [r0, #0x0]
         add r0, #0x2
         mov r1, #0x40
         strh r1, [r0, #0x0]
         ldr r2, [pc, #0x2c] # REFERENCE_.L5c
         ldr r0, [pc, #0x2c] # REFERENCE_.L60
         strh r0, [r2, #0x6]
         ldr r0, [pc, #0x2c] # REFERENCE_.L64
         mov r4, r12
         str r0, [r4, #0x4]
         ldr r0, [pc, #0x2c] # REFERENCE_.L68
         str r0, [r4, #0xc]
         strh r3, [r4, #0x26]
         strh r1, [r4, #0x28]
         ldr r0, [pc, #0x28] # REFERENCE_.L6c
         strh r0, [r2, #0x0]
         pop {r4}
         pop {r0}
         bx r0
         .word gBgScrollRegs
         .word gUnknown_03001D80
         .word 0x6008000
         .word 0x600b000
         .word gBgCntRegs
         .word 0x960a
         .word 0x600c000
         .word 0x600e000
         .hword 0x9c0e
```

## `sub_805068C`

```c
void sub_805068C() { }
```

```asm
         ldr r1, [pc, #0x34] # REFERENCE_.L38
         mov r0, #0x0
         strh r0, [r1, #0x0]
         strh r0, [r1, #0x2]
         strh r0, [r1, #0xc]
         strh r0, [r1, #0xe]
         ldr r2, [pc, #0x2c] # REFERENCE_.L3c
         mov r1, r2
         add r1, #0xc4
         ldr r0, [pc, #0x2c] # REFERENCE_.L40
         str r0, [r1, #0x0]
         add r1, #0x8
         ldr r0, [pc, #0x28] # REFERENCE_.L44
         str r0, [r1, #0x0]
         ldr r1, [pc, #0x28] # REFERENCE_.L48
         ldr r0, [pc, #0x2c] # REFERENCE_.L4c
         strh r0, [r1, #0x6]
         ldr r0, [pc, #0x2c] # REFERENCE_.L50
         str r0, [r2, #0x4]
         ldr r0, [pc, #0x2c] # REFERENCE_.L54
         str r0, [r2, #0xc]
         mov r0, #0x40
         strh r0, [r2, #0x26]
         strh r0, [r2, #0x28]
         ldr r0, [pc, #0x24] # REFERENCE_.L58
         strh r0, [r1, #0x0]
         bx lr
         .hword 0x0
         .word gBgScrollRegs
         .word gUnknown_03001D80
         .word 0x600c000
         .word 0x600e800
         .word gBgCntRegs
         .word 0x1d0e
         .word 0x6008000
         .word 0x600a000
         .hword 0x940a
```

## `sub_808CE88`

```c
void sub_808CE88() { }
```

```asm
         push {lr}
         mov r2, r0
         mov r1, #0x8
         ldrsh r0, [r2, r1]
         lsl r0, #0x2
         mov r1, r2
         add r1, #0x14
         add r1, r0
         ldr r0, [r1, #0x0]
         cmp r0, #0x7b
         beq .L2819
         ldr r1, [pc, #0xc] # REFERENCE_.L24
         ldr r0, [r2, #0x30]
         asr r0, #0x8
         neg r0, r0
         strh r0, [r1, #0x4]
         mov r0, #0x0
         b .L3c29
         .word gBgScrollRegs
     10mov r3, #0xa
         ldrsh r0, [r2, r3]
         str r0, [r1, #0x0]
         mov r0, #0x0
         strh r0, [r2, #0xc]
         ldr r0, [pc, #0xc] # REFERENCE_.L40
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.L44
         str r0, [r1, #0x8]
         mov r0, #0x1
     17pop {r1}
         bx r1
```

## `sub_8050CA4`

```c
void sub_8050CA4() { }
```

```asm
         ldr r1, [pc, #0x2c] # REFERENCE_.L30
         mov r0, #0x0
         strh r0, [r1, #0x0]
         strh r0, [r1, #0x2]
         strh r0, [r1, #0xc]
         strh r0, [r1, #0xe]
         ldr r2, [pc, #0x24] # REFERENCE_.L34
         mov r1, r2
         add r1, #0xc4
         ldr r0, [pc, #0x24] # REFERENCE_.L38
         str r0, [r1, #0x0]
         add r1, #0x8
         ldr r0, [pc, #0x20] # REFERENCE_.L3c
         str r0, [r1, #0x0]
         add r1, #0x1a
         mov r0, #0x40
         strh r0, [r1, #0x0]
         add r1, #0x2
         mov r0, #0x20
         strh r0, [r1, #0x0]
         ldr r1, [pc, #0x14] # REFERENCE_.L40
         ldr r0, [pc, #0x18] # REFERENCE_.L44
         strh r0, [r1, #0x6]
         bx lr
         .word gBgScrollRegs
         .word gUnknown_03001D80
         .word 0x6008000
         .word 0x600a000
         .word gBgCntRegs
         .hword 0x540a
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80945A0
sub_80945A0: @ 0x080945A0
	push {r4, lr}
	ldr r3, _08094600 @ =gBgScrollRegs
	movs r1, #4
	ldrsh r2, [r3, r1]
	movs r1, #0x18
	subs r1, r1, r2
	str r1, [r0, #0x60]
	movs r4, #6
	ldrsh r2, [r3, r4]
	movs r1, #0x87
	subs r1, r1, r2
	str r1, [r0, #0x64]
	movs r2, #4
	ldrsh r1, [r3, r2]
	movs r2, #0x19
	subs r1, r2, r1
	str r1, [r0, #0x68]
	movs r4, #6
	ldrsh r1, [r3, r4]
	subs r2, r2, r1
	str r2, [r0, #0x6c]
	movs r2, #4
	ldrsh r1, [r3, r2]
	rsbs r1, r1, #0
	adds r1, #0x50
	str r1, [r0, #0x78]
	movs r4, #6
	ldrsh r1, [r3, r4]
	rsbs r1, r1, #0
	adds r1, #0x5c
	str r1, [r0, #0x7c]
	adds r2, r0, #0
	adds r2, #0x90
	movs r4, #4
	ldrsh r1, [r3, r4]
	rsbs r1, r1, #0
	adds r1, #0x50
	str r1, [r2]
	adds r0, #0x94
	movs r2, #6
	ldrsh r1, [r3, r2]
	rsbs r1, r1, #0
	adds r1, #0x5c
	str r1, [r0]
	pop {r4}
	pop {r0}
	bx r0
	.align 2, 0
_08094600: .4byte gBgScrollRegs
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
