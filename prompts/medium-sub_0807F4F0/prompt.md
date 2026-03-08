You are decompiling an assembly function called `sub_0807F4F0` in ARMv4T from a Game Boy Advance game.

# Examples

## `Player_80064D4`

```c
void Player_80064D4(Player *p)
{
    PlayerSpriteInfo *temp_r2;
    s16 var_r5;
    s16 temp_r0;
    u16 var_r0;
    u32 temp_r1;

    var_r5 = -Q(3);
    if (p->moveState & MOVESTATE_80) {
        var_r5 = -Q(1.5);
    }
    if ((sub_8017058(p) == 0) && ((sub_8014BC4(p) << 0x10) == 0)) {
        if ((p->qSpeedAirY < var_r5) && !(p->keyInput & gStageData.buttonConfig.jump)) {
            p->qSpeedAirY = var_r5;
            p->callback = sub_800EE64;
        } else if (p->qSpeedAirY > 0) {
            p->callback = sub_800EE64;
        }

        if ((p->charFlags.state1 == 0) && (p->qSpeedAirY >= 0)) {
            p->charFlags.state1 = 1;
        } else if (p->charFlags.state1 == 1) {
            temp_r2 = p->spriteInfoBody;
            if (temp_r2->s.frameFlags & 0x4000) {
                temp_r2->s.frameFlags &= ~0x4000;
                p->charFlags.state1 = 2;
            }
        }
        sub_800EF18(p);
    }
}
```

```asm
         push {r4, r5, lr}
         mov r4, r0
         mov r5, #0xfd
         lsl r5, #0x8
         ldr r0, [r4, #0x4]
         mov r1, #0x80
         and r0, r1
         cmp r0, #0x0
         beq .L1410
         ldr r5, [pc, #0x34] # REFERENCE_.L48
     8mov r0, r4
         bl sub_8017058-0x4
         cmp r0, #0x0
         bne .L9e73
         mov r0, r4
         bl sub_8014BC4-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L9e73
         mov r0, #0x1a
         ldrsh r1, [r4, r0]
         lsl r0, r5, #0x10
         asr r0, #0x10
         ldrh r2, [r4, #0x1a]
         cmp r1, r0
         bge .L5036
         ldr r0, [pc, #0x10] # REFERENCE_.L4c
         ldrh r1, [r4, #0x1e]
         ldrh r0, [r0, #0x14]
         and r0, r1
         cmp r0, #0x0
         bne .L5036
         strh r5, [r4, #0x1a]
         b .L5639
         .word 0xfe80
         .word gStageData
     25lsl r0, r2, #0x10
         cmp r0, #0x0
         ble .L5a41
     33ldr r0, [pc, #0x18] # REFERENCE_.L70
         str r0, [r4, #0x0]
     38ldrh r0, [r4, #0x36]
         mov r1, r0
         cmp r1, #0x0
         bne .L7453
         mov r2, #0x1a
         ldrsh r0, [r4, r2]
         cmp r0, #0x0
         blt .L7453
         mov r0, #0x1
         b .L9670
         .hword 0x0
         .word sub_800EE64
     44lsl r0, r1, #0x10
         lsr r0, #0x10
         cmp r0, #0x1
         bne .L9871
         mov r0, r4
         add r0, #0xe0
         ldr r2, [r0, #0x0]
         ldr r1, [r2, #0x14]
         mov r0, #0x80
         lsl r0, #0x7
         and r0, r1
         cmp r0, #0x0
         beq .L9871
         ldr r0, [pc, #0x14] # REFERENCE_.La4
         and r1, r0
         str r1, [r2, #0x14]
         mov r0, #0x2
     50strh r0, [r4, #0x36]
     56mov r0, r4
         bl sub_800EF18-0x4
     13pop {r4, r5}
         pop {r0}
         bx r0
         .word 0xffffbfff
```

## `sub_800EDC8`

```c
void sub_800EDC8(Player *p)
{
    s16 var_r5;

    var_r5 = -Q(3);
    if (p->moveState & 0x80) {
        var_r5 = -Q(1.5);
    }

    if (!sub_8017058(p) && ((sub_8014BC4(p) << 0x10) == 0)) {
        if (((s32)p->qSpeedAirY < (s32)var_r5) && !(p->keyInput & gStageData.buttonConfig.jump)) {
            p->qSpeedAirY = var_r5;
            p->callback = sub_800EE38;
        } else if (p->qSpeedAirY > 0) {
            p->callback = sub_800EE38;
        }
        sub_801350C(p);
        sub_800EF18(p);
    }
}
```

```asm
         push {r4, r5, lr}
         mov r4, r0
         mov r5, #0xfd
         lsl r5, #0x8
         ldr r0, [r4, #0x4]
         mov r1, #0x80
         and r0, r1
         cmp r0, #0x0
         beq .L1410
         ldr r5, [pc, #0x34] # REFERENCE_.L48
     8mov r0, r4
         bl sub_8017058-0x4
         cmp r0, #0x0
         bne .L6645
         mov r0, r4
         bl sub_8014BC4-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L6645
         mov r0, #0x1a
         ldrsh r1, [r4, r0]
         lsl r0, r5, #0x10
         asr r0, #0x10
         ldrh r2, [r4, #0x1a]
         cmp r1, r0
         bge .L5036
         ldr r0, [pc, #0x10] # REFERENCE_.L4c
         ldrh r1, [r4, #0x1e]
         ldrh r0, [r0, #0x14]
         and r0, r1
         cmp r0, #0x0
         bne .L5036
         strh r5, [r4, #0x1a]
         b .L5639
         .word 0xfe80
         .word gStageData
     25lsl r0, r2, #0x10
         cmp r0, #0x0
         ble .L5a41
     33ldr r0, [pc, #0x14] # REFERENCE_.L6c
         str r0, [r4, #0x0]
     38mov r0, r4
         bl sub_801350C-0x4
         mov r0, r4
         bl sub_800EF18-0x4
     13pop {r4, r5}
         pop {r0}
         bx r0
         .word sub_800EE38
```

## `sub_8014258`

```c
void sub_8014258(Player *p)
{
    u16 rings = gStageData.rings;

    if (p->unkC & 1) {
        if (rings > 149) {
            p->charFlags.ringSpeedFactor = RSF_4;
        } else if (rings > 99) {
            p->charFlags.ringSpeedFactor = RSF_3;
        } else if (rings > 49) {
            p->charFlags.ringSpeedFactor = RSF_2;
        } else if (rings > 10) {
            p->charFlags.ringSpeedFactor = RSF_1;
        } else {
            p->charFlags.ringSpeedFactor = RSF_0;
        }
    } else {
        p->charFlags.ringSpeedFactor = 0;
    }
}
```

```asm
         push {r4, lr}
         mov r2, r0
         ldr r0, [pc, #0x20] # REFERENCE_.L28
         add r0, #0xac
         ldrh r3, [r0, #0x0]
         mov r4, r3
         ldr r0, [r2, #0xc]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L6248
         cmp r3, #0x95
         bls .L2c21
         add r2, #0x2d
         ldrb r1, [r2, #0x0]
         mov r0, #0xf
         and r0, r1
         mov r1, #0x40
         orr r0, r1
         b .L6a52
         .word gStageData
     12cmp r3, #0x63
         bls .L3e30
         add r2, #0x2d
         ldrb r1, [r2, #0x0]
         mov r0, #0xf
         and r0, r1
         mov r1, #0x30
         orr r0, r1
         b .L6a52
     22cmp r3, #0x31
         bls .L5039
         add r2, #0x2d
         ldrb r1, [r2, #0x0]
         mov r0, #0xf
         and r0, r1
         mov r1, #0x20
         orr r0, r1
         b .L6a52
     31cmp r4, #0xa
         bls .L6248
         add r2, #0x2d
         ldrb r1, [r2, #0x0]
         mov r0, #0xf
         and r0, r1
         mov r1, #0x10
         orr r0, r1
         b .L6a52
     10add r2, #0x2d
         ldrb r1, [r2, #0x0]
         mov r0, #0xf
         and r0, r1
     19strb r0, [r2, #0x0]
         pop {r4}
         pop {r0}
         bx r0
```

## `sub_801BA2C`

```c
void sub_801BA2C(Player *p)
{
    u8 temp_r0 = p->unk148.arr_u8[3];

    if (temp_r0 == 0) {
        sub_801BAFC(p);
    } else {
        if (--p->unk148.arr_u8[3] == 0) {
            p->charFlags.state1 = 0;
        }
    }
    if (p->unk14C.arr_s16[0] != 0) {
        p->unk14C.arr_s16[0]--;
    }
    if ((u8)p->charFlags.state0_highValue != 1) {
        if ((p->qSpeedAirY < -Q(1)) || (p->qSpeedAirY -= Q(32. / 256.), ++p->charFlags.state0_highValue == 0x20)) {
            p->charFlags.state0_highValue = 1U;
        }
    } else {
        if ((p->keyInput2 & gStageData.buttonConfig.jump) && (p->qSpeedAirY >= -Q(1)) && (p->unk14C.arr_s16[0] != 0)) {
            p->charFlags.state0_highValue = 2U;
        }
        p->qSpeedAirY += Q(8. / 256.);
    }
    sub_801BC48(p);

    if (!sub_8015064(p)) {
        sub_8016D30(p);
        sub_801C098(p);
        sub_801C14C(p);
    }
}
```

```asm
         push {r4, lr}
         mov r4, r0
         ldr r0, [pc, #0x10] # REFERENCE_.L18
         add r1, r4, r0
         ldrb r0, [r1, #0x0]
         cmp r0, #0x0
         bne .L1c12
         mov r0, r4
         bl .Lcc93
         b .L2a19
         .hword 0x0
         .word 0x14b
     6sub r0, #0x1
         strb r0, [r1, #0x0]
         lsl r0, #0x18
         lsr r0, #0x18
         cmp r0, #0x0
         bne .L2a19
         strh r0, [r4, #0x36]
     9mov r1, #0xa6
         lsl r1, #0x1
         add r2, r4, r1
         ldrh r1, [r2, #0x0]
         mov r3, #0x0
         ldrsh r0, [r2, r3]
         cmp r0, #0x0
         beq .L3e29
         sub r0, r1, #0x1
         strh r0, [r2, #0x0]
     26mov r3, r4
         add r3, #0x2f
         ldrb r0, [r3, #0x0]
         cmp r0, #0x1
         beq .L7455
         ldrh r2, [r4, #0x1a]
         mov r0, #0x1a
         ldrsh r1, [r4, r0]
         ldr r0, [pc, #0x20] # REFERENCE_.L70
         cmp r1, r0
         blt .L6850
         mov r0, r2
         sub r0, #0x20
         strh r0, [r4, #0x1a]
         ldrb r0, [r3, #0x0]
         add r0, #0x1
         strb r0, [r3, #0x0]
         lsl r0, #0x18
         lsr r0, #0x18
         cmp r0, #0x20
         bne .L9c75
     39mov r0, #0x1
         strb r0, [r3, #0x0]
         b .L9c75
         .hword 0x0
         .word 0xffffff00
     33ldr r0, [pc, #0x50] # REFERENCE_.Lc8
         ldrh r1, [r4, #0x20]
         ldrh r0, [r0, #0x14]
         and r0, r1
         cmp r0, #0x0
         beq .L9672
         mov r0, #0x1a
         ldrsh r1, [r4, r0]
         ldr r0, [pc, #0x44] # REFERENCE_.Lcc
         cmp r1, r0
         blt .L9672
         mov r1, #0x0
         ldrsh r0, [r2, r1]
         cmp r0, #0x0
         beq .L9672
         mov r0, #0x2
         strb r0, [r3, #0x0]
     60ldrh r0, [r4, #0x1a]
         add r0, #0x8
         strh r0, [r4, #0x1a]
     49mov r0, r4
         bl sub_801BC48-0x4
         mov r0, r4
         bl sub_8015064-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         bne .Lc088
         mov r0, r4
         bl sub_8016D30-0x4
         mov r0, r4
         bl sub_801C098-0x4
         mov r0, r4
         bl sub_801C14C-0x4
     81pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word gStageData
     8.word 0xffffff00
```

## `sub_80443B0`

```c
void sub_80443B0(IceSpike *spike)
{
    IceSpikeParams arr[28];
    s32 qWorldX, qWorldY;
    s32 *ptr32;
    u16 *ptr16;
    u8 i;

    qWorldX = spike->base.qWorldX;
    qWorldY = spike->base.qWorldY;

    ptr32 = &spike->unk54[0];
    ptr16 = &spike->unkC4[0];

    memcpy(arr, gUnknown_080D014C, sizeof(arr));

    {
        s16 time = gStageData.timer * 16;

        for (i = 0; i < spike->base.unk18; i++, time += 0x40) {
            *ptr32++ = qWorldX + arr[i].qUnk0;
            *ptr16++ = arr[i].qUnk8 >> 1;
            *ptr32++ = qWorldY + arr[i].qUnk4;
            *ptr16++ = arr[i].qUnkC + (time & 0xFF);
        }
    }

    spike->base.unk19 = 2;

    sub_8003DF0(SE_ICE_SPIKE);
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x1c0
         mov r5, r0
         ldr r0, [r5, #0x4]
         mov r9, r0
         ldr r2, [r5, #0x8]
         mov r8, r2
         mov r7, r5
         add r7, #0x54
         mov r4, r5
         add r4, #0xc4
         ldr r1, [pc, #0x14] # REFERENCE_.L34
         mov r2, #0xe0
         lsl r2, #0x1
         mov r0, sp
         bl memcpy-0x4
         ldr r0, [pc, #0xc] # REFERENCE_.L38
         ldr r0, [r0, #0x1c]
         lsl r0, #0x14
         lsr r6, r0, #0x10
         mov r3, #0x0
         b .L7e60
         .word gUnknown_080D014C
         .word gStageData
     62lsl r1, r3, #0x4
         mov r2, sp
         add r0, r2, r1
         ldr r0, [r0, #0x0]
         add r0, r9
         stmia r7!, {r0}
         add r0, sp, #0x8
         add r0, r1
         ldr r0, [r0, #0x0]
         asr r0, #0x1
         strh r0, [r4, #0x0]
         add r4, #0x2
         add r0, sp, #0x4
         add r0, r1
         ldr r0, [r0, #0x0]
         add r0, r8
         stmia r7!, {r0}
         add r0, sp, #0xc
         add r0, r1
         ldr r2, [r0, #0x0]
         lsl r1, r6, #0x10
         asr r1, #0x10
         mov r0, #0xff
         and r0, r1
         add r2, r0
         strh r2, [r4, #0x0]
         add r4, #0x2
         add r0, r3, #0x1
         lsl r0, #0x18
         lsr r3, r0, #0x18
         add r1, #0x40
         lsl r1, #0x10
         lsr r6, r1, #0x10
     24ldrb r0, [r5, #0x18]
         cmp r3, r0
         blo .L3c27
         mov r0, #0x2
         strb r0, [r5, #0x19]
         ldr r0, [pc, #0x10] # REFERENCE_.L9c
         bl sub_8003DF0-0x4
         add sp, #0x1c0
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word 0x24a
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_0807F4F0
sub_0807F4F0: @ 0x0807F4F0
	push {r4, r5, lr}
	ldr r5, _0807F538 @ =gStageData
	adds r1, r5, #0
	adds r1, #0x88
	ldr r1, [r1]
	ldrh r4, [r1, #6]
	movs r1, #0xc0
	lsls r1, r1, #0x12
	adds r3, r4, r1
	ldrb r2, [r0, #2]
	movs r1, #0x7f
	ands r1, r2
	ldrb r2, [r0, #3]
	ldrb r0, [r0, #4]
	lsls r0, r0, #8
	orrs r2, r0
	adds r0, r2, #0
	cmp r1, #1
	bne _0807F544
	movs r0, #0
	strb r0, [r3]
	adds r0, r5, #0
	adds r0, #0xae
	strh r2, [r0]
	movs r0, #0x3c
	strh r0, [r3, #0x14]
	ldr r0, _0807F53C @ =0x03000228
	adds r2, r4, r0
	ldr r1, _0807F540 @ =gUnknown_080D5C38
	ldrh r0, [r1]
	strh r0, [r2, #0xc]
	ldrh r0, [r1, #2]
	strb r0, [r2, #0x1a]
	movs r0, #0x64
	strh r0, [r3, #0x16]
	b _0807F560
	.align 2, 0
_0807F538: .4byte gStageData
_0807F53C: .4byte 0x03000228
_0807F540: .4byte gUnknown_080D5C38
_0807F544:
	cmp r1, #1
	blt _0807F560
	cmp r1, #4
	bgt _0807F560
	cmp r1, #3
	blt _0807F560
	ldrb r1, [r3]
	lsls r0, r0, #0x18
	lsrs r0, r0, #0x18
	cmp r1, r0
	beq _0807F560
	adds r0, r3, #0
	bl sub_807F434
_0807F560:
	pop {r4, r5}
	pop {r0}
	bx r0
	.align 2, 0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
