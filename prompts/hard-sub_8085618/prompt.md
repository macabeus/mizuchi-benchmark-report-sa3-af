You are decompiling an assembly function called `sub_8085618` in ARMv4T from a Game Boy Advance game.

# Examples

## `ClearOamBufferDma`

```c
void ClearOamBufferDma(void)
{
    gNumHBlankCallbacks = 0;

    gFlags &= ~FLAGS_EXECUTE_HBLANK_CALLBACKS;
    if (!(gFlags & FLAGS_20)) {
#if ((GAME == GAME_SA1) || (GAME == GAME_SA3))
        if (gBgOffsetsHBlankPrimary == gBgOffsetsBuffer[0]) {
            gBgOffsetsHBlankPrimary = gBgOffsetsBuffer[1];
            gBgOffsetsHBlankSecondary = gBgOffsetsBuffer[0];
        } else {
            gBgOffsetsHBlankPrimary = gBgOffsetsBuffer[0];
            gBgOffsetsHBlankSecondary = gBgOffsetsBuffer[1];
        }
#else
        if (gBgOffsetsHBlankPrimary == gBgOffsetsPrimary) {
            gBgOffsetsHBlankPrimary = gBgOffsetsSecondary;
            gBgOffsetsHBlankSecondary = gBgOffsetsPrimary;
        } else {
            gBgOffsetsHBlankPrimary = gBgOffsetsPrimary;
            gBgOffsetsHBlankSecondary = gBgOffsetsSecondary;
        }
#endif
    }
    gFlags &= ~FLAGS_EXECUTE_HBLANK_COPY;
    DmaFill16(3, 0x200, gOamBuffer + (OAM_ENTRY_COUNT / 4) * 0, OAM_SIZE / 4);
    DmaFill16(3, 0x200, gOamBuffer + (OAM_ENTRY_COUNT / 4) * 1, OAM_SIZE / 4);
    DmaFill16(3, 0x200, gOamBuffer + (OAM_ENTRY_COUNT / 4) * 2, OAM_SIZE / 4);
    DmaFill16(3, 0x200, gOamBuffer + (OAM_ENTRY_COUNT / 4) * 3, OAM_SIZE / 4);

    gNumVBlankCallbacks = 0;
    gFlags &= ~FLAGS_EXECUTE_VBLANK_CALLBACKS;
}
```

```asm
         push {r4, lr}
         sub sp, #0x4
         ldr r1, [pc, #0x30] # REFERENCE_.L38
         mov r0, #0x0
         strb r0, [r1, #0x0]
         ldr r2, [pc, #0x30] # REFERENCE_.L3c
         ldr r0, [r2, #0x0]
         mov r1, #0x9
         neg r1, r1
         and r0, r1
         str r0, [r2, #0x0]
         mov r1, #0x20
         and r0, r1
         mov r4, r2
         cmp r0, #0x0
         bne .L5839
         ldr r1, [pc, #0x1c] # REFERENCE_.L40
         ldr r0, [r1, #0x0]
         ldr r2, [pc, #0x1c] # REFERENCE_.L44
         cmp r0, r2
         bne .L4c33
         mov r3, #0xa0
         lsl r3, #0x2
         add r0, r2, r3
         str r0, [r1, #0x0]
         ldr r0, [pc, #0x14] # REFERENCE_.L48
         str r2, [r0, #0x0]
         b .L5839
         .word gNumHBlankCallbacks
         .word gFlags
         .word gBgOffsetsHBlankPrimary
         .word gBgOffsetsBuffer
         .word gBgOffsetsHBlankSecondary
     20str r2, [r1, #0x0]
         ldr r1, [pc, #0x7c] # REFERENCE_.Lcc
         mov r3, #0xa0
         lsl r3, #0x2
         add r0, r2, r3
         str r0, [r1, #0x0]
     15ldr r0, [r4, #0x0]
         mov r1, #0x5
         neg r1, r1
         and r0, r1
         str r0, [r4, #0x0]
         mov r0, sp
         mov r1, #0x80
         lsl r1, #0x2
         mov r3, r1
         strh r3, [r0, #0x0]
         ldr r0, [pc, #0x60] # REFERENCE_.Ld0
         mov r1, sp
         str r1, [r0, #0x0]
         ldr r1, [pc, #0x60] # REFERENCE_.Ld4
         mov r12, r1
         str r1, [r0, #0x4]
         ldr r2, [pc, #0x5c] # REFERENCE_.Ld8
         str r2, [r0, #0x8]
         ldr r1, [r0, #0x8]
         mov r1, sp
         strh r3, [r1, #0x0]
         str r1, [r0, #0x0]
         mov r1, #0x80
         lsl r1, #0x1
         add r1, r12
         str r1, [r0, #0x4]
         str r2, [r0, #0x8]
         ldr r1, [r0, #0x8]
         mov r1, sp
         strh r3, [r1, #0x0]
         str r1, [r0, #0x0]
         mov r1, #0x80
         lsl r1, #0x2
         add r1, r12
         str r1, [r0, #0x4]
         str r2, [r0, #0x8]
         ldr r1, [r0, #0x8]
         mov r1, sp
         strh r3, [r1, #0x0]
         str r1, [r0, #0x0]
         mov r1, #0xc0
         lsl r1, #0x2
         add r1, r12
         str r1, [r0, #0x4]
         str r2, [r0, #0x8]
         ldr r0, [r0, #0x8]
         ldr r1, [pc, #0x24] # REFERENCE_.Ldc
         mov r0, #0x0
         strb r0, [r1, #0x0]
         ldr r0, [r4, #0x0]
         mov r1, #0x11
         neg r1, r1
         and r0, r1
         str r0, [r4, #0x0]
         add sp, #0x4
         pop {r4}
         pop {r0}
         bx r0
         .word gBgOffsetsHBlankSecondary
         .word 0x40000d4
         .word gOamBuffer
         .word 0x81000080
         .word gNumVBlankCallbacks
```

## `ClearOamBufferCpuSet`

```c
static void ClearOamBufferCpuSet(void)
{
    gNumHBlankCallbacks = 0;

    gFlags &= ~FLAGS_EXECUTE_HBLANK_CALLBACKS;
    if (!(gFlags & FLAGS_20)) {
        if (gBgOffsetsHBlankPrimary == gBgOffsetsPrimary) {
            gBgOffsetsHBlankPrimary = gBgOffsetsSecondary;
            gBgOffsetsHBlankSecondary = gBgOffsetsPrimary;
        } else {
            gBgOffsetsHBlankPrimary = gBgOffsetsPrimary;
            gBgOffsetsHBlankSecondary = gBgOffsetsSecondary;
        }
    }
    gFlags &= ~FLAGS_EXECUTE_HBLANK_COPY;
    CpuFastFill(0x200, gOamBuffer, sizeof(gOamBuffer));
    gNumVBlankCallbacks = 0;
    gFlags &= ~FLAGS_EXECUTE_VBLANK_CALLBACKS;
}
```

```asm
         push {r4, lr}
         sub sp, #0x4
         ldr r1, [pc, #0x30] # REFERENCE_.L38
         mov r0, #0x0
         strb r0, [r1, #0x0]
         ldr r2, [pc, #0x30] # REFERENCE_.L3c
         ldr r0, [r2, #0x0]
         mov r1, #0x9
         neg r1, r1
         and r0, r1
         str r0, [r2, #0x0]
         mov r1, #0x20
         and r0, r1
         mov r4, r2
         cmp r0, #0x0
         bne .L5839
         ldr r1, [pc, #0x1c] # REFERENCE_.L40
         ldr r0, [r1, #0x0]
         ldr r2, [pc, #0x1c] # REFERENCE_.L44
         cmp r0, r2
         bne .L4c33
         mov r3, #0xa0
         lsl r3, #0x2
         add r0, r2, r3
         str r0, [r1, #0x0]
         ldr r0, [pc, #0x14] # REFERENCE_.L48
         str r2, [r0, #0x0]
         b .L5839
         .word gNumHBlankCallbacks
         .word gFlags
         .word gBgOffsetsHBlankPrimary
         .word gBgOffsetsBuffer
         .word gBgOffsetsHBlankSecondary
     20str r2, [r1, #0x0]
         ldr r1, [pc, #0x3c] # REFERENCE_.L8c
         mov r3, #0xa0
         lsl r3, #0x2
         add r0, r2, r3
         str r0, [r1, #0x0]
     15ldr r0, [r4, #0x0]
         mov r1, #0x5
         neg r1, r1
         and r0, r1
         str r0, [r4, #0x0]
         mov r0, #0x80
         lsl r0, #0x2
         str r0, [sp, #0x0]
         ldr r1, [pc, #0x24] # REFERENCE_.L90
         ldr r2, [pc, #0x28] # REFERENCE_.L94
         mov r0, sp
         bl CpuFastSet-0x4
         ldr r1, [pc, #0x24] # REFERENCE_.L98
         mov r0, #0x0
         strb r0, [r1, #0x0]
         ldr r0, [r4, #0x0]
         mov r1, #0x11
         neg r1, r1
         and r0, r1
         str r0, [r4, #0x0]
         add sp, #0x4
         pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word gBgOffsetsHBlankSecondary
         .word gOamBuffer
         .word 0x1000100
         .word gNumVBlankCallbacks
```

## `sa2__sub_80078D4`

```c
void sa2__sub_80078D4(u8 bg, int_vcount minY, int_vcount maxY, u16 offsetEven, u16 offsetOdd)
{
    s32 fillVal;

    gFlags |= FLAGS_EXECUTE_HBLANK_COPY;

    gHBlankCopyTarget = (void *)&((u8 *)&REG_BG0HOFS)[bg * 4];
    gHBlankCopySize = 4;

    if (minY < maxY) {
        fillVal = (offsetEven %= 512u) | ((offsetOdd % 512u) << 16);

        DmaFill32(3, fillVal, &((u16 *)gBgOffsetsHBlankPrimary)[minY * 2], (maxY - minY) * 4);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         sub sp, #0x4
         ldr r4, [sp, #0x18]
         lsl r0, #0x18
         lsl r1, #0x18
         lsr r5, r1, #0x18
         lsl r2, #0x18
         lsr r7, r2, #0x18
         lsl r3, #0x10
         lsr r6, r3, #0x10
         lsl r4, #0x10
         lsr r4, #0x10
         ldr r2, [pc, #0x4c] # REFERENCE_.L68
         ldr r1, [r2, #0x0]
         mov r3, #0x4
         orr r1, r3
         str r1, [r2, #0x0]
         ldr r1, [pc, #0x48] # REFERENCE_.L6c
         lsr r0, #0x16
         ldr r2, [pc, #0x48] # REFERENCE_.L70
         add r0, r2
         str r0, [r1, #0x0]
         ldr r0, [pc, #0x44] # REFERENCE_.L74
         strb r3, [r0, #0x0]
         cmp r5, r7
         bhs .L6048
         ldr r2, [pc, #0x40] # REFERENCE_.L78
         mov r1, r6
         and r1, r2
         mov r0, r4
         and r0, r2
         lsl r0, #0x10
         orr r1, r0
         str r1, [sp, #0x0]
         ldr r2, [pc, #0x34] # REFERENCE_.L7c
         mov r0, sp
         str r0, [r2, #0x0]
         ldr r0, [pc, #0x34] # REFERENCE_.L80
         lsl r1, r5, #0x2
         ldr r0, [r0, #0x0]
         add r0, r1
         str r0, [r2, #0x4]
         sub r0, r7, r5
         mov r1, #0x85
         lsl r1, #0x18
         orr r0, r1
         str r0, [r2, #0x8]
         ldr r0, [r2, #0x8]
     25add sp, #0x4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gFlags
         .word gHBlankCopyTarget
         .word 0x4000010
         .word gHBlankCopySize
         .word 0x1ff
         .word 0x40000d4
         .word gBgOffsetsHBlankPrimary
```

## `sa2__sub_8007958`

```c
void sa2__sub_8007958(u8 bg, int_vcount minY, int_vcount maxY, s16 param3, s8 param4, u16 param5, u16 param6)
{
    u16 *cursor;

    gFlags |= FLAGS_EXECUTE_HBLANK_COPY;

    gHBlankCopyTarget = (void *)&((u8 *)&REG_BG0HOFS)[bg * 4];
    gHBlankCopySize = 4;

    cursor = &((u16 *)gBgOffsetsHBlankPrimary)[minY * 2];

    while (minY < maxY) {
        *cursor = (param3 + param5) & 0x1FF;
        cursor++;
        *cursor = param6;
        cursor++;

        param3 = -(param3 + param4);
        param4 = -param4;

        minY++;
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x4
         ldr r4, [sp, #0x20]
         ldr r5, [sp, #0x24]
         ldr r6, [sp, #0x28]
         mov r8, r6
         lsl r0, #0x18
         lsl r1, #0x18
         lsr r7, r1, #0x18
         lsl r2, #0x18
         lsr r2, #0x18
         mov r12, r2
         lsl r3, #0x10
         lsr r6, r3, #0x10
         lsl r4, #0x18
         lsr r4, #0x18
         lsl r5, #0x10
         lsr r5, #0x10
         mov r9, r5
         mov r1, r8
         lsl r1, #0x10
         lsr r5, r1, #0x10
         ldr r2, [pc, #0x64] # REFERENCE_.L98
         ldr r1, [r2, #0x0]
         mov r3, #0x4
         orr r1, r3
         str r1, [r2, #0x0]
         ldr r1, [pc, #0x5c] # REFERENCE_.L9c
         lsr r0, #0x16
         ldr r2, [pc, #0x5c] # REFERENCE_.La0
         add r0, r2
         str r0, [r1, #0x0]
         ldr r0, [pc, #0x5c] # REFERENCE_.La4
         strb r3, [r0, #0x0]
         ldr r0, [pc, #0x5c] # REFERENCE_.La8
         lsl r1, r7, #0x2
         ldr r0, [r0, #0x0]
         add r2, r0, r1
         cmp r7, r12
         bhs .L8868
         ldr r0, [pc, #0x54] # REFERENCE_.Lac
         mov r3, r0
     67mov r1, r9
         add r0, r1, r6
         and r0, r3
         strh r0, [r2, #0x0]
         add r2, #0x2
         strh r5, [r2, #0x0]
         add r2, #0x2
         lsl r1, r4, #0x18
         asr r1, #0x18
         lsl r0, r6, #0x10
         asr r0, #0x10
         add r0, r1
         neg r0, r0
         lsl r0, #0x10
         lsr r6, r0, #0x10
         neg r1, r1
         lsl r1, #0x18
         lsr r4, r1, #0x18
         add r0, r7, #0x1
         lsl r0, #0x18
         lsr r7, r0, #0x18
         cmp r7, r12
         blo .L5a45
     42add sp, #0x4
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word gFlags
         .word gHBlankCopyTarget
         .word 0x4000010
         .word gHBlankCopySize
         .word gBgOffsetsHBlankPrimary
         .word 0x1ff
```

## `sub_803205C`

```c
bool32 sub_803205C(Ramp *ramp, Player *p)
{
    Sprite *s = &ramp->s;
    s16 dx, dy;
    s16 r0, r6;
    s32 r2;
    s8 r2_8;
    s32 unk39;

    if (!sub_8020700(s, ramp->worldX, ramp->worldY, 0, p, 0)) {
        return 0;
    }

    dx = I(p->qWorldX);
    dy = I(p->qWorldY);

    r0 = p->spriteOffsetY + I(p->qWorldY);

    dx -= ramp->worldX;
    dy = r0 - ramp->worldY;

    r6 = dy;
    r2 = dx;

    dx += 19;

    if ((u16)dx > 38) {
        return 0;
    }

    unk39 = ramp->unk39;
    if (ramp->unk38) {
        if (unk39) {
            r2_8 = gUnknown_080CF51C[0][20 - r2];
            if (r2_8 > r6) {
                return 0;
            }
        } else {
            r2_8 = gUnknown_080CF51C[0][r2 + 20];
            if (r2_8 > r6) {
                return 0;
            }
        }
    } else {
        if (unk39) {
            r2_8 = gUnknown_080CF51C[1][20 - r2];
            if (r2_8 > r6) {
                return 0;
            }
        } else {
            r2_8 = gUnknown_080CF51C[1][r2 + 20];
            if (r2_8 > r6) {
                return 0;
            }
        }
    }

    p->qWorldY = Q(ramp->worldY + r2_8 - p->spriteOffsetY);

    if (p->qSpeedAirY > 0) {
        p->qSpeedAirY = 0;
    }

    return 1;
}
```

```asm
         push {r4, r5, r6, lr}
         sub sp, #0x8
         mov r4, r0
         mov r5, r1
         add r0, #0xc
         mov r2, #0x34
         ldrsh r1, [r4, r2]
         mov r3, #0x36
         ldrsh r2, [r4, r3]
         str r5, [sp, #0x0]
         mov r3, #0x0
         str r3, [sp, #0x4]
         bl sub_8020700-0x4
         cmp r0, #0x0
         beq .Lac82
         ldr r1, [r5, #0x10]
         lsl r1, #0x8
         ldr r2, [r5, #0x14]
         asr r2, #0x8
         mov r3, r5
         add r3, #0x25
         mov r0, #0x0
         ldrsb r0, [r3, r0]
         add r0, r2
         ldrh r2, [r4, #0x34]
         asr r1, #0x10
         sub r1, r2
         ldrh r2, [r4, #0x36]
         lsl r0, #0x10
         asr r0, #0x10
         sub r0, r2
         lsl r0, #0x10
         lsr r6, r0, #0x10
         lsl r1, #0x10
         asr r2, r1, #0x10
         mov r0, #0x98
         lsl r0, #0xd
         add r1, r0
         lsr r1, #0x10
         cmp r1, #0x26
         bhi .Lac82
         mov r0, r4
         add r0, #0x39
         ldrb r1, [r0, #0x0]
         sub r0, #0x1
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         beq .L8463
         cmp r1, #0x0
         beq .L7456
         ldr r1, [pc, #0x8] # REFERENCE_.L70
         mov r0, #0x14
         sub r0, r2
         add r0, r1
         b .L9e75
         .word gUnknown_080CF51C
     49ldr r1, [pc, #0x8] # REFERENCE_.L80
         mov r0, r2
         add r0, #0x14
         add r0, r1
         b .L9e75
         .hword 0x0
         .word gUnknown_080CF51C
     47cmp r1, #0x0
         beq .L9872
         ldr r1, [pc, #0x8] # REFERENCE_.L94
         mov r0, #0x14
         sub r0, r2
         add r1, #0x28
         add r0, r1
         b .L9e75
         .word gUnknown_080CF51C
     64ldr r0, [pc, #0x14] # REFERENCE_.Lb0
         add r0, r2
         add r0, #0x3c
     54ldrb r2, [r0, #0x0]
         mov r1, #0x0
         ldrsb r1, [r0, r1]
         lsl r0, r6, #0x10
         asr r0, #0x10
         cmp r1, r0
         ble .Lb485
     14mov r0, #0x0
         b .Ld6102
         .word gUnknown_080CF51C
     81mov r0, #0x36
         ldrsh r1, [r4, r0]
         lsl r0, r2, #0x18
         asr r0, #0x18
         add r1, r0
         mov r0, #0x0
         ldrsb r0, [r3, r0]
         sub r1, r0
         lsl r1, #0x8
         str r1, [r5, #0x14]
         mov r1, #0x1a
         ldrsh r0, [r5, r1]
         cmp r0, #0x0
         ble .Ld4101
         mov r0, #0x0
         strh r0, [r5, #0x1a]
     98mov r0, #0x1
     83add sp, #0x8
         pop {r4, r5, r6}
         pop {r1}
         bx r1
```

# Functions that call the target assembly

## `sub_808439C`

```c
void sub_808439C() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         mov r7, r0
         ldrh r3, [r7, #0x8]
         mov r4, #0x96
         lsl r4, #0x1
         cmp r3, r4
         bne .L1611
         b .L1e0229
     9cmp r3, r4
         bgt .L3a29
         cmp r3, #0x64
         beq .L114132
         cmp r3, #0x64
         bgt .L2c22
         cmp r3, #0x0
         beq .L6e55
         cmp r3, #0xa
         beq .Lf4116
         b .L56c640
     16cmp r3, #0x6e
         bne .L3225
         b .L168172
     23cmp r3, #0xc8
         bne .L3828
         b .L1b4210
     26b  .L56c640
     12mov r0, #0xaf
         lsl r0, #0x1
         cmp r3, r0
         bne .L4434
         b .L354396
     32cmp r3, r0
         bgt .L5a45
         sub r0, #0x14
         cmp r3, r0
         bne .L5040
         b .L238272
     38add r0, #0xa
         cmp r3, r0
         bne .L5844
         b .L33c384
     42b  .L56c640
     35mov r0, #0xb4
         lsl r0, #0x1
         cmp r3, r0
         bne .L6450
         b .L3ec464
     48add r0, #0x8c
         cmp r3, r0
         bne .L6c54
         b .L500587
     52b  .L56c640
     18ldr r2, [pc, #0x70] # REFERENCE_.Le0
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x70] # REFERENCE_.Le4
         mul r0, r1
         ldr r1, [pc, #0x70] # REFERENCE_.Le8
         add r0, r1
         str r0, [r2, #0x0]
         mov r1, #0x1
         and r0, r1
         mov r1, r7
         add r1, #0xe2
         strb r0, [r1, #0x0]
         sub r1, #0x12
         mov r0, #0xf0
         lsl r0, #0x7
         str r0, [r1, #0x0]
         mov r0, r7
         add r0, #0xd4
         str r3, [r0, #0x0]
         add r0, #0x4
         str r3, [r0, #0x0]
         mov r2, #0xa2
         lsl r2, #0x1
         add r1, r7, r2
         mov r0, #0x80
         lsl r0, #0x2
         str r0, [r1, #0x0]
         mov r0, r7
         add r0, #0xe4
         str r3, [r0, #0x0]
         add r0, #0x4
         str r3, [r0, #0x0]
         strh r3, [r7, #0x4]
         mov r0, #0x64
         strh r0, [r7, #0x8]
         ldr r0, [pc, #0x34] # REFERENCE_.Lec
         bl m4aSongNumStart-0x4
         mov r1, #0x0
         mov r3, #0x0
         ldr r2, [pc, #0x30] # REFERENCE_.Lf0
     108lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r4, #0xed
         lsl r4, #0x2
         add r0, r4
         add r0, r7, r0
         strh r2, [r0, #0xc]
         strb r3, [r0, #0x1a]
         add r0, r1, #0x1
         lsl r0, #0x18
         lsr r1, r0, #0x18
         cmp r1, #0x3
         bls .Lc095
         b .L56c640
         .hword 0x0
         .word gPseudoRandom
         .word 0x196225
         .word 0x3c6ef35f
         .word 0x239
         .word 0x4fe
     20ldrh r0, [r7, #0x4]
         sub r0, #0x1
         strh r0, [r7, #0x4]
         lsl r0, #0x10
         cmp r0, #0x0
         beq .L102123
         b .L56c640
     121mov r2, r7
         add r2, #0xe2
         ldrb r0, [r2, #0x0]
         mov r1, #0x1
         eor r0, r1
         strb r0, [r2, #0x0]
         mov r0, #0x64
         strh r0, [r7, #0x8]
         b .L56c640
     14mov r0, r7
         add r0, #0xe2
         ldrb r0, [r0, #0x0]
         mov r1, #0x1
         cmp r0, #0x0
         beq .L122139
         mov r1, #0x2
     137mov r4, r1
         mov r0, r7
         add r0, #0xd0
         lsl r1, r4, #0x2
         add r2, r0, r1
         ldr r0, [r0, #0x0]
         ldr r1, [r2, #0x0]
         cmp r0, r1
         ble .L142155
         mov r6, #0xa2
         lsl r6, #0x1
         add r0, r7, r6
         ldr r0, [r0, #0x0]
         add r0, r1, r0
         str r0, [r2, #0x0]
         b .L14c159
     147ldr r0, [pc, #0x20] # REFERENCE_.L164
         bl m4aSongNumStart-0x4
         mov r0, #0x6e
         strh r0, [r7, #0x8]
     154sub r0, r4, #0x1
         lsl r0, #0x2
         mov r1, r7
         add r1, #0xe4
         add r1, r0
         ldr r0, [r1, #0x0]
         mov r2, #0xc0
         lsl r2, #0x1
         add r0, r2
         str r0, [r1, #0x0]
         b .L1d0223
         .hword 0x0
         .word 0x239
     24mov r0, r7
         add r0, #0xe2
         ldrb r0, [r0, #0x0]
         mov r1, #0x2
         cmp r0, #0x0
         beq .L176179
         mov r1, #0x1
     177mov r4, r1
         mov r0, r7
         add r0, #0xd0
         lsl r1, r4, #0x2
         add r2, r0, r1
         ldr r0, [r0, #0x0]
         ldr r1, [r2, #0x0]
         cmp r0, r1
         ble .L196195
         mov r3, #0xa2
         lsl r3, #0x1
         add r0, r7, r3
         ldr r0, [r0, #0x0]
         add r0, r1, r0
         str r0, [r2, #0x0]
         b .L19e199
     187mov r0, #0x3c
         strh r0, [r7, #0x4]
         mov r0, #0xc8
         strh r0, [r7, #0x8]
     194sub r0, r4, #0x1
         lsl r0, #0x2
         mov r1, r7
         add r1, #0xe4
         add r1, r0
         ldr r0, [r1, #0x0]
         mov r4, #0xc0
         lsl r4, #0x1
         add r0, r4
         str r0, [r1, #0x0]
         b .L1d0223
     27ldrh r0, [r7, #0x4]
         sub r0, #0x1
         strh r0, [r7, #0x4]
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L1d0223
         ldr r0, [pc, #0x18] # REFERENCE_.L1dc
         mov r2, #0x87
         lsl r2, #0x2
         mov r1, #0x0
         mov r3, #0x1
         bl sub_8078DB0-0x4
         strh r4, [r7, #0x8]
     169mov r0, r7
         mov r1, #0x4
         bl sub_8082E2C-0x4
         b .L56c640
         .hword 0x0
         .word 0x505
     10ldr r2, [pc, #0x78] # REFERENCE_.L25c
         ldrh r0, [r2, #0x0]
         mov r6, #0x84
         lsl r6, #0x6
         mov r1, r6
         orr r0, r1
         strh r0, [r2, #0x0]
         ldr r1, [pc, #0x70] # REFERENCE_.L260
         mov r3, #0x0
         mov r0, #0xf0
         strh r0, [r1, #0x0]
         mov r0, #0xa0
         strh r0, [r1, #0x4]
         mov r0, #0x3f
         strh r0, [r1, #0x8]
         mov r0, #0x18
         strh r0, [r1, #0xa]
         ldr r1, [pc, #0x60] # REFERENCE_.L264
         ldr r0, [pc, #0x60] # REFERENCE_.L268
         strh r0, [r1, #0x0]
         ldr r0, [pc, #0x60] # REFERENCE_.L26c
         strh r0, [r1, #0x2]
         mov r0, #0xc
         strh r0, [r1, #0x4]
         mov r0, #0x1
         strb r0, [r7, #0xf]
         ldr r0, [pc, #0x58] # REFERENCE_.L270
         add r1, r7, r0
         ldr r2, [pc, #0x58] # REFERENCE_.L274
         ldrh r0, [r2, #0x0]
         strh r0, [r1, #0xc]
         ldrh r0, [r2, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         mov r0, r7
         add r0, #0xcc
         strh r3, [r0, #0x0]
         ldr r0, [pc, #0x48] # REFERENCE_.L278
         bl m4aSongNumStart-0x4
         mov r0, #0xa5
         lsl r0, #0x1
         strh r0, [r7, #0x8]
     39mov r1, r7
         add r1, #0xcc
         ldrh r0, [r1, #0x0]
         add r0, #0x4
         strh r0, [r1, #0x0]
         lsl r0, #0x10
         lsr r0, #0x10
         mov r3, r1
         cmp r0, #0xff
         bls .L29e315
         mov r0, r7
         add r0, #0xe2
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         bne .L27c298
         mov r0, #0x5
         add r1, #0x21
         b .L282301
         .word gDispCnt
         .word gWinRegs
         .word gBldRegs
         .word 0x3841
         .word 0xc0c
         .word 0x814
         .word gUnknown_080D5D0C
         .word 0x23e
     286mov r0, #0x6
         mov r1, r7
         add r1, #0xed
     289strb r0, [r1, #0x0]
         mov r0, #0xb4
         strh r0, [r7, #0x4]
         ldr r2, [pc, #0x94] # REFERENCE_.L320
         add r1, r7, r2
         ldr r2, [pc, #0x94] # REFERENCE_.L324
         ldrh r0, [r2, #0x4]
         strh r0, [r1, #0xc]
         ldrh r0, [r2, #0x6]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         add r0, #0x55
         strh r0, [r7, #0x8]
     281mov r0, r7
         add r0, #0x9c
         ldr r0, [r0, #0x0]
         asr r0, #0x8
         ldr r2, [pc, #0x80] # REFERENCE_.L328
         ldr r1, [r2, #0x0]
         sub r0, r1
         lsl r0, #0x10
         lsr r0, #0x10
         mov r8, r0
         mov r0, r7
         add r0, #0xa0
         ldr r0, [r0, #0x0]
         asr r0, #0x8
         ldr r1, [r2, #0x4]
         sub r0, r1
         lsl r0, #0x10
         lsr r0, #0x10
         mov r9, r0
         ldr r1, [pc, #0x64] # REFERENCE_.L32c
         ldrh r0, [r3, #0x0]
         lsl r0, #0x1
         add r0, r1
         mov r3, #0x0
         ldrsh r1, [r0, r3]
         lsl r0, r1, #0x1
         add r0, r1
         lsl r0, #0x3
         cmp r0, #0x0
         bge .L2de347
         ldr r4, [pc, #0x54] # REFERENCE_.L330
         add r0, r4
     344mov r6, r8
         lsl r4, r6, #0x10
         asr r1, r4, #0x10
         mov r8, r1
         ldr r2, [pc, #0x4c] # REFERENCE_.L334
         add r4, r2
         asr r4, #0x10
         mov r3, r9
         lsl r5, r3, #0x10
         asr r5, #0x10
         asr r6, r0, #0xe
         mov r0, r4
         mov r1, r5
         mov r2, r6
         bl sub_8085618-0x4
         mov r0, r7
         mov r1, r4
         mov r2, r5
         mov r3, r6
         bl sub_8087188-0x4
         mov r0, r7
         mov r1, #0x4
         bl sub_8082E2C-0x4
         ldr r1, [pc, #0x24] # REFERENCE_.L338
         mov r4, #0xac
         lsl r4, #0x1
         mov r0, r4
         mov r6, r8
         b .L3ca452
         .hword 0x0
         .word 0x814
         .word gUnknown_080D5D0C
         .word gCamera
         .word gSineTable
         .word 0x3fff
         .word 0xffa80000
         .word gBgScrollRegs
     43mov r0, r7
         add r0, #0xee
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         beq .L37c416
         mov r0, #0x4
         mov r1, r7
         add r1, #0xed
         strb r0, [r1, #0x0]
         mov r0, #0xaf
         lsl r0, #0x1
         b .L37a415
     33mov r0, r7
         add r0, #0xee
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         beq .L37c416
         mov r1, r7
         add r1, #0xed
         mov r0, #0x0
         strb r0, [r1, #0x0]
         ldr r3, [pc, #0x70] # REFERENCE_.L3d8
         add r1, r7, r3
         ldr r2, [pc, #0x70] # REFERENCE_.L3dc
         ldrh r0, [r2, #0x0]
         strh r0, [r1, #0xc]
         ldrh r0, [r2, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         add r0, #0x69
     395strh r0, [r7, #0x8]
     388mov r0, r7
         add r0, #0x9c
         ldr r4, [r0, #0x0]
         asr r4, #0x8
         ldr r1, [pc, #0x58] # REFERENCE_.L3e0
         ldr r0, [r1, #0x0]
         sub r4, r0
         mov r0, r7
         add r0, #0xa0
         ldr r5, [r0, #0x0]
         asr r5, #0x8
         ldr r0, [r1, #0x4]
         sub r5, r0
         lsl r4, #0x10
         asr r6, r4, #0x10
         ldr r0, [pc, #0x48] # REFERENCE_.L3e4
         add r4, r0
         asr r4, #0x10
         lsl r5, #0x10
         asr r5, #0x10
         mov r0, r4
         mov r1, r5
         mov r2, #0x18
         bl sub_8085618-0x4
         mov r0, r7
         mov r1, r4
         mov r2, r5
         mov r3, #0x18
         bl sub_8087188-0x4
         mov r0, r7
         mov r1, #0x4
         bl sub_8082E2C-0x4
         ldr r1, [pc, #0x24] # REFERENCE_.L3e8
         mov r2, #0xac
         lsl r2, #0x1
         mov r0, r2
     375sub r0, r6
         strh r0, [r1, #0x0]
         mov r0, #0x18
         sub r0, r5
         strh r0, [r1, #0x2]
         b .L56c640
         .hword 0x0
         .word 0x814
         .word gUnknown_080D5D0C
         .word gCamera
         .word 0xffa80000
         .word gBgScrollRegs
     49mov r4, r7
         add r4, #0xcc
         ldrh r0, [r4, #0x0]
         sub r0, #0x4
         strh r0, [r4, #0x0]
         lsl r0, #0x10
         lsr r3, r0, #0x10
         cmp r3, #0x0
         bne .L438502
         ldr r2, [pc, #0xd0] # REFERENCE_.L4d0
         ldrh r1, [r2, #0x0]
         ldr r0, [pc, #0xd0] # REFERENCE_.L4d4
         and r0, r1
         strh r0, [r2, #0x0]
         ldr r0, [pc, #0xcc] # REFERENCE_.L4d8
         strh r3, [r0, #0x8]
         strh r3, [r0, #0xa]
         ldr r0, [pc, #0xcc] # REFERENCE_.L4dc
         strh r3, [r0, #0x0]
         strh r3, [r0, #0x2]
         strh r3, [r0, #0x4]
         ldr r2, [pc, #0xc8] # REFERENCE_.L4e0
         ldr r0, [r2, #0x0]
         mov r1, #0x5
         neg r1, r1
         and r0, r1
         str r0, [r2, #0x0]
         ldr r3, [pc, #0xc0] # REFERENCE_.L4e4
         add r1, r7, r3
         ldr r2, [pc, #0xc0] # REFERENCE_.L4e8
         ldrh r0, [r2, #0x8]
         strh r0, [r1, #0xc]
         ldrh r0, [r2, #0xa]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         add r0, #0xf5
         strh r0, [r7, #0x8]
     472ldrh r0, [r4, #0x0]
         cmp r0, #0x0
         beq .L4a6555
         mov r0, r7
         add r0, #0x9c
         ldr r0, [r0, #0x0]
         asr r0, #0x8
         ldr r2, [pc, #0xa4] # REFERENCE_.L4ec
         ldr r1, [r2, #0x0]
         sub r0, r1
         lsl r0, #0x10
         lsr r0, #0x10
         mov r8, r0
         mov r0, r7
         add r0, #0xa0
         ldr r0, [r0, #0x0]
         asr r0, #0x8
         ldr r1, [r2, #0x4]
         sub r0, r1
         lsl r0, #0x10
         lsr r0, #0x10
         mov r9, r0
         ldr r1, [pc, #0x88] # REFERENCE_.L4f0
         ldrh r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r1
         mov r4, #0x0
         ldrsh r1, [r0, r4]
         lsl r0, r1, #0x1
         add r0, r1
         lsl r0, #0x3
         cmp r0, #0x0
         bge .L47e537
         ldr r6, [pc, #0x78] # REFERENCE_.L4f4
         add r0, r6
     534mov r1, r8
         lsl r4, r1, #0x10
         ldr r2, [pc, #0x74] # REFERENCE_.L4f8
         add r4, r2
         asr r4, #0x10
         mov r3, r9
         lsl r5, r3, #0x10
         asr r5, #0x10
         asr r6, r0, #0xe
         mov r0, r4
         mov r1, r5
         mov r2, r6
         bl sub_8085618-0x4
         mov r0, r7
         mov r1, r4
         mov r2, r5
         mov r3, r6
         bl sub_8087188-0x4
     504mov r0, r7
         mov r1, #0x4
         bl sub_8082E2C-0x4
         ldr r2, [pc, #0x4c] # REFERENCE_.L4fc
         mov r4, #0xac
         lsl r4, #0x1
         mov r1, r4
         mov r6, r8
         lsl r0, r6, #0x10
         asr r0, #0x10
         sub r1, r0
         strh r1, [r2, #0x0]
         mov r1, #0x18
         mov r3, r9
         lsl r0, r3, #0x10
         asr r0, #0x10
         sub r1, r0
         strh r1, [r2, #0x2]
         b .L56c640
         .hword 0x0
         .word gDispCnt
         .word 0xdeff
         .word gWinRegs
         .word gBldRegs
         .word gFlags
         .word 0x814
         .word gUnknown_080D5D0C
         .word gCamera
         .word gSineTable
         .word 0x3fff
         .word 0xffa80000
         .word gBgScrollRegs
     53mov r3, r7
         add r3, #0xd4
         ldr r2, [r3, #0x0]
         cmp r2, #0x0
         beq .L528607
         mov r4, #0xa2
         lsl r4, #0x1
         add r1, r7, r4
         ldr r0, [r1, #0x0]
         sub r0, r2, r0
         str r0, [r3, #0x0]
         mov r2, r7
         add r2, #0xd8
         ldr r0, [r2, #0x0]
         ldr r1, [r1, #0x0]
         sub r0, r1
         str r0, [r2, #0x0]
         add r2, #0xc
         add r3, #0x14
         b .L556630
     591strb r2, [r7, #0xf]
         strb r2, [r7, #0x1]
         mov r1, #0x0
         mov r2, r7
         add r2, #0xe4
         mov r3, r7
         add r3, #0xe8
         ldr r5, [pc, #0x40] # REFERENCE_.L578
         mov r4, #0x1
     629lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r6, #0xed
         lsl r6, #0x2
         add r0, r6
         add r0, r7, r0
         strh r5, [r0, #0xc]
         strb r4, [r0, #0x1a]
         add r0, r1, #0x1
         lsl r0, #0x18
         lsr r1, r0, #0x18
         cmp r1, #0x3
         bls .L53a616
     606ldr r0, [r2, #0x0]
         ldr r1, [pc, #0x20] # REFERENCE_.L57c
         add r0, r1
         str r0, [r2, #0x0]
         ldr r0, [r3, #0x0]
         add r0, r1
         str r0, [r3, #0x0]
         mov r0, r7
         mov r1, #0x4
         bl sub_8082E2C-0x4
     21pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word 0x4fe
         .word 0xfffffe80
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8085618
sub_8085618: @ 0x08085618
	push {r4, r5, r6, lr}
	sub sp, #8
	lsls r0, r0, #0x10
	lsrs r5, r0, #0x10
	lsls r1, r1, #0x10
	lsrs r3, r1, #0x10
	lsls r2, r2, #0x10
	lsrs r4, r2, #0x10
	movs r1, #0
	ldr r0, _08085648 @ =gBgOffsetsHBlankPrimary
	ldr r0, [r0]
	ldr r2, _0808564C @ =gBgOffsetsBuffer
	cmp r0, r2
	bne _08085658
	add r0, sp, #4
	strh r1, [r0]
	ldr r0, _08085650 @ =0x040000D4
	add r1, sp, #4
	str r1, [r0]
	str r2, [r0, #4]
	ldr r1, _08085654 @ =0x81000140
	str r1, [r0, #8]
	ldr r0, [r0, #8]
	b _0808566E
	.align 2, 0
_08085648: .4byte gBgOffsetsHBlankPrimary
_0808564C: .4byte gBgOffsetsBuffer
_08085650: .4byte 0x040000D4
_08085654: .4byte 0x81000140
_08085658:
	add r0, sp, #4
	strh r1, [r0]
	ldr r1, _080856B0 @ =0x040000D4
	str r0, [r1]
	movs r6, #0xa0
	lsls r6, r6, #2
	adds r0, r2, r6
	str r0, [r1, #4]
	ldr r0, _080856B4 @ =0x81000140
	str r0, [r1, #8]
	ldr r0, [r1, #8]
_0808566E:
	cmp r4, #0
	bne _08085674
	movs r4, #1
_08085674:
	lsls r0, r3, #0x10
	asrs r3, r0, #0x10
	lsls r0, r4, #0x10
	asrs r1, r0, #0x10
	subs r0, r3, r1
	lsls r0, r0, #0x10
	lsrs r2, r0, #0x10
	cmp r0, #0
	bge _08085688
	movs r2, #0
_08085688:
	adds r0, r3, r1
	lsls r0, r0, #0x10
	lsrs r1, r0, #0x10
	asrs r0, r0, #0x10
	cmp r0, #0xa0
	ble _08085696
	movs r1, #0xa0
_08085696:
	lsls r0, r2, #0x10
	asrs r0, r0, #0x10
	cmp r0, #0x9f
	bgt _080856A4
	lsls r0, r1, #0x10
	cmp r0, #0
	bgt _080856BC
_080856A4:
	ldr r0, _080856B8 @ =gFlags
	ldr r1, [r0]
	movs r2, #4
	orrs r1, r2
	str r1, [r0]
	b _080856D2
	.align 2, 0
_080856B0: .4byte 0x040000D4
_080856B4: .4byte 0x81000140
_080856B8: .4byte gFlags
_080856BC:
	lsls r2, r2, #0x18
	lsrs r2, r2, #0x18
	lsls r3, r5, #0x18
	lsrs r3, r3, #0x18
	lsls r0, r1, #0x18
	lsrs r0, r0, #0x18
	str r0, [sp]
	movs r0, #0
	movs r1, #0
	bl sa2__sub_8007A08
_080856D2:
	add sp, #8
	pop {r4, r5, r6}
	pop {r0}
	bx r0
	.align 2, 0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
