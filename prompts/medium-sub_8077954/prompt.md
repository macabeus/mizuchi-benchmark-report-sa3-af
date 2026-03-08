You are decompiling an assembly function called `sub_8077954` in ARMv4T from a Game Boy Advance game.

# Examples

## `MPlayFadeOut`

```c
void MPlayFadeOut(struct MP2KPlayerState *mplayInfo, u16 speed)
{
    if (mplayInfo->lockStatus == ID_NUMBER) {
        mplayInfo->lockStatus++;
        mplayInfo->fadeCounter = speed;
        mplayInfo->fadeInterval = speed;
        mplayInfo->fadeOV = (64 << FADE_VOL_SHIFT);
        mplayInfo->lockStatus = ID_NUMBER;
    }
}
```

```asm
         mov r2, r0
         lsl r1, #0x10
         lsr r1, #0x10
         ldr r3, [r2, #0x34]
         ldr r0, [pc, #0x10] # REFERENCE_.L1c
         cmp r3, r0
         bne .L1812
         strh r1, [r2, #0x26]
         strh r1, [r2, #0x24]
         mov r0, #0x80
         lsl r0, #0x1
         strh r0, [r2, #0x28]
     6bx  lr
         .hword 0x0
         .word 0x68736d53
```

## `m4aMPlayFadeOutTemporarily`

```c
void m4aMPlayFadeOutTemporarily(struct MP2KPlayerState *mplayInfo, u16 speed)
{
    if (mplayInfo->lockStatus == ID_NUMBER) {
        mplayInfo->lockStatus++;
        mplayInfo->fadeCounter = speed;
        mplayInfo->fadeInterval = speed;
        mplayInfo->fadeOV = (64 << FADE_VOL_SHIFT) | TEMPORARY_FADE;
        mplayInfo->lockStatus = ID_NUMBER;
    }
}
```

```asm
         mov r2, r0
         lsl r1, #0x10
         lsr r1, #0x10
         ldr r3, [r2, #0x34]
         ldr r0, [pc, #0xc] # REFERENCE_.L18
         cmp r3, r0
         bne .L1611
         strh r1, [r2, #0x26]
         strh r1, [r2, #0x24]
         ldr r0, [pc, #0x8] # REFERENCE_.L1c
         strh r0, [r2, #0x28]
     6bx  lr
         .word 0x68736d53
         .word 0x101
```

## `m4aMPlayFadeIn`

```c
void m4aMPlayFadeIn(struct MP2KPlayerState *mplayInfo, u16 speed)
{
    if (mplayInfo->lockStatus == ID_NUMBER) {
        mplayInfo->lockStatus++;
        mplayInfo->fadeCounter = speed;
        mplayInfo->fadeInterval = speed;
        mplayInfo->fadeOV = (0 << FADE_VOL_SHIFT) | FADE_IN;
        mplayInfo->status &= ~MUSICPLAYER_STATUS_PAUSE;
        mplayInfo->lockStatus = ID_NUMBER;
    }
}
```

```asm
         mov r2, r0
         lsl r1, #0x10
         lsr r1, #0x10
         ldr r3, [r2, #0x34]
         ldr r0, [pc, #0x14] # REFERENCE_.L20
         cmp r3, r0
         bne .L1e15
         strh r1, [r2, #0x26]
         strh r1, [r2, #0x24]
         mov r0, #0x2
         strh r0, [r2, #0x28]
         ldr r0, [r2, #0x4]
         ldr r1, [pc, #0x8] # REFERENCE_.L24
         and r0, r1
         str r0, [r2, #0x4]
     6bx  lr
         .word 0x68736d53
         .word 0x7fffffff
```

## `animCmd_SetSpritePriority`

```c
static AnimCmdResult animCmd_SetSpritePriority(void *cursor, Sprite *s)
{
    ACmd_SetSpritePriority *cmd = cursor;
    s->animCursor += AnimCommandSizeInWords(*cmd);

    SPRITE_FLAG_CLEAR(s, PRIORITY);
    SPRITE_FLAG_SET_VALUE(s, PRIORITY, cmd->priority);

    return ACMD_RESULT__RUNNING;
}
```

```asm
         ldrh r2, [r1, #0xe]
         add r2, #0x2
         strh r2, [r1, #0xe]
         ldr r2, [r1, #0x8]
         ldr r3, [pc, #0xc] # REFERENCE_.L18
         and r2, r3
         ldr r0, [r0, #0x4]
         lsl r0, #0xc
         orr r2, r0
         str r2, [r1, #0x8]
         mov r0, #0x1
         bx lr
         .word 0xffffcfff
```

## `MultiBootInit`

```c
void MultiBootInit(struct MultiBootParam *mp) { MULTIBOOT_INIT(mp); }
```

```asm
         mov r2, r0
         mov r1, #0x0
         strb r1, [r2, #0x1e]
         strb r1, [r2, #0x18]
         strb r1, [r2, #0x1d]
         mov r3, r2
         add r3, #0x4a
         mov r0, #0xf
         strb r0, [r3, #0x0]
         mov r0, r2
         add r0, #0x48
         strb r1, [r0, #0x0]
         strh r1, [r2, #0x16]
         ldr r0, [pc, #0x10] # REFERENCE_.L2c
         strh r1, [r0, #0x0]
         ldr r2, [pc, #0x10] # REFERENCE_.L30
         ldr r3, [pc, #0x10] # REFERENCE_.L34
         mov r0, r3
         strh r0, [r2, #0x0]
         ldr r0, [pc, #0x10] # REFERENCE_.L38
         strh r1, [r0, #0x0]
         bx lr
         .word 0x4000134
         .word 0x4000128
         .word 0x2003
         .word 0x400012a
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8077954
sub_8077954: @ 0x08077954
	lsls r1, r1, #0x18
	adds r0, #0x80
	ldr r2, _08077970 @ =gUnknown_080D5904
	lsrs r1, r1, #0x16
	adds r1, r1, r2
	ldrh r2, [r1]
	strh r2, [r0, #0xc]
	ldrh r1, [r1, #2]
	strb r1, [r0, #0x1a]
	ldr r1, _08077974 @ =0x0000FFFF
	strh r1, [r0, #0x18]
	movs r1, #0xff
	strb r1, [r0, #0x1b]
	bx lr
	.align 2, 0
_08077970: .4byte gUnknown_080D5904
_08077974: .4byte 0x0000FFFF
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
