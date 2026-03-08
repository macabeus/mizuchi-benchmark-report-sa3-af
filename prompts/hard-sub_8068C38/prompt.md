You are decompiling an assembly function called `sub_8068C38` in ARMv4T from a Game Boy Advance game.

# Examples

## `Task_803A8A8`

```c
void Task_803A8A8(void)
{
    Capsule *cap = TASK_DATA(gCurTask);
    Sprite *s;

    if ((gStageData.playerIndex == 0) && (cap->unkD >= 96)) {
        s = &cap->s3;

        cap->unk10 = gStageData.unk8C;

        if (cap->unk10 >= cap->unk11) {
            sub_803C010(1);
            sub_803B1A4(cap);
            sub_803B498();
            sub_803BFC4(cap);

            s->anim = gUnknown_080CF770[1].anim;
            s->variant = gUnknown_080CF770[1].variant;
            s->prevVariant = -1;
            s->y = 60;

            cap->unk18 = 100;

            gCurTask->main = Task_8039DC0;

            return;
        } else {
            if (cap->unkD == 96) {
                s->anim = gUnknown_080CF770[2].anim;
                s->variant = gUnknown_080CF770[2].variant;
                s->prevVariant = -1;
            }

            gStageData.unk8C = cap->unk10;
        }
    }
    if (--cap->unkD == 0) {
        // _0803A940
        cap->unkD = 128;
        gCurTask->main = Task_803A978;
    }

    sub_803C010(0);
    sub_803B1A4(cap);
    sub_803B498();
    sub_803B288();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         ldr r1, [pc, #0x68] # REFERENCE_.L6c
         ldr r0, [r1, #0x0]
         ldrh r2, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r2, r0
         ldr r6, [pc, #0x60] # REFERENCE_.L70
         ldrb r0, [r6, #0x6]
         mov r7, r1
         cmp r0, #0x0
         bne .L9867
         ldrb r3, [r5, #0xd]
         cmp r3, #0x5f
         bls .L9867
         ldr r0, [pc, #0x54] # REFERENCE_.L74
         add r4, r2, r0
         mov r2, r6
         add r2, #0x8c
         ldrh r0, [r2, #0x0]
         strb r0, [r5, #0x10]
         lsl r0, #0x18
         asr r0, #0x18
         mov r1, #0x11
         ldrsb r1, [r5, r1]
         cmp r0, r1
         blt .L8055
         mov r0, #0x1
         bl sub_803C010-0x4
         mov r0, r5
         bl sub_803B1A4-0x4
         bl sub_803B498-0x4
         mov r0, r5
         bl sub_803BFC4-0x4
         ldr r1, [pc, #0x28] # REFERENCE_.L78
         ldrh r0, [r1, #0xc]
         strh r0, [r4, #0xc]
         ldrb r0, [r1, #0xe]
         strb r0, [r4, #0x1a]
         mov r0, #0xff
         strb r0, [r4, #0x1b]
         mov r0, #0x3c
         strh r0, [r4, #0x12]
         mov r0, #0x64
         strh r0, [r5, #0x18]
         ldr r1, [r7, #0x0]
         ldr r0, [pc, #0x14] # REFERENCE_.L7c
         str r0, [r1, #0x8]
         b .Lc284
         .hword 0x0
         .word gCurTask
         .word gStageData
         .word 0x3000588
         .word gUnknown_080CF770
         .word Task_8039DC0
     26cmp r3, #0x60
         bne .L9264
         ldr r1, [pc, #0x40] # REFERENCE_.Lc8
         ldrh r0, [r1, #0x14]
         strh r0, [r4, #0xc]
         ldrb r0, [r1, #0x16]
         strb r0, [r4, #0x1a]
         mov r0, #0xff
         strb r0, [r4, #0x1b]
     56mov r0, #0x10
         ldrsb r0, [r5, r0]
         strh r0, [r2, #0x0]
     11ldrb r0, [r5, #0xd]
         sub r0, #0x1
         strb r0, [r5, #0xd]
         lsl r0, #0x18
         cmp r0, #0x0
         bne .Lae78
         mov r0, #0x80
         strb r0, [r5, #0xd]
         ldr r1, [r7, #0x0]
         ldr r0, [pc, #0x20] # REFERENCE_.Lcc
         str r0, [r1, #0x8]
     72mov r0, #0x0
         bl sub_803C010-0x4
         mov r0, r5
         bl sub_803B1A4-0x4
         bl sub_803B498-0x4
         bl sub_803B288-0x4
     48pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gUnknown_080CF770
         .word Task_803A978
```

## `Task_8098FF0`

```c
void Task_8098FF0()
{
#ifndef BUG_FIX
    s16 var_r0;
#else
    s16 var_r0 = 0;
#endif
    u8 var_r5;
    s32 playerIndex;

    CharacterSelect *cs = TASK_DATA(gCurTask);

    var_r5 = 0;
    playerIndex = gStageData.playerIndex;
    if ((cs->createIndex != 0) && (cs->createIndex != 3)) {
        if (cs->createIndex == 1) {
            if (playerIndex == 0) {
                var_r0 = sub_8024074(cs->unk4);
            } else {
                var_r0 = sub_8023E04();
            }
            cs->unk9 |= 0x10 & (u16)var_r0;
        }

        if (var_r0 < 0) {
            sub_802613C();
            return;
        }
    }
    {
        sub_809B13C(cs);
        sub_809ADF0(cs);
        sub_809AE50(cs);
        sub_809B69C(cs);
        sub_809B6C0(cs);
        sub_809B234(cs);
        sub_809B2E4(cs);

        if (cs->unk1 == 0) {
            var_r5 = sub_809B638(cs);
        }
        if (cs->unk1 == 1) {
            var_r5 = sub_809B668(cs);
        }
        if (var_r5 != 0) {
            sub_80990B0(cs);
            gCurTask->main = Task_8099200;
        }
    }
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x2c] # REFERENCE_.L30
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         mov r5, #0x0
         ldr r0, [pc, #0x20] # REFERENCE_.L34
         ldrb r1, [r0, #0x6]
         ldrb r0, [r4, #0x7]
         cmp r0, #0x0
         beq .L5638
         cmp r0, #0x3
         beq .L5638
         cmp r0, #0x1
         bne .L4a33
         cmp r1, #0x0
         bne .L3825
         ldrb r0, [r4, #0x4]
         bl sub_8024074-0x4
         b .L3c26
         .hword 0x0
         .word gCurTask
         .word gStageData
     18bl sub_8023E04-0x4
     21lsl r0, #0x10
         lsr r2, r0, #0x10
         mov r0, #0x10
         and r0, r2
         ldrb r1, [r4, #0x9]
         orr r0, r1
         strb r0, [r4, #0x9]
     16lsl r0, r2, #0x10
         cmp r0, #0x0
         bge .L5638
         bl sub_802613C-0x4
         b .Lb274
     12mov r0, r4
         bl sub_809B13C-0x4
         mov r0, r4
         bl sub_809ADF0-0x4
         mov r0, r4
         bl sub_809AE50-0x4
         mov r0, r4
         bl sub_809B69C-0x4
         mov r0, r4
         bl sub_809B6C0-0x4
         mov r0, r4
         bl sub_809B234-0x4
         mov r0, r4
         bl sub_809B2E4-0x4
         ldrb r0, [r4, #0x1]
         cmp r0, #0x0
         bne .L9059
         mov r0, r4
         bl sub_809B638-0x4
         lsl r0, #0x18
         lsr r5, r0, #0x18
     54ldrb r0, [r4, #0x1]
         cmp r0, #0x1
         bne .La066
         mov r0, r4
         bl sub_809B668-0x4
         lsl r0, #0x18
         lsr r5, r0, #0x18
     61cmp r5, #0x0
         beq .Lb274
         mov r0, r4
         bl .Lbc78
         ldr r0, [pc, #0xc] # REFERENCE_.Lb8
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Lbc
         str r0, [r1, #0x8]
     37pop {r4, r5}
         pop {r0}
         bx r0
         .word gCurTask
     69.word Task_8099200
```

## `sub_80497FC`

```c
void sub_80497FC(void)
{
    Gondola *gond = TASK_DATA(gCurTask);

    switch (gond->unk49) {
        case 0: {
            ;
        } break;

        case 1: {
            gond->qWorldX += gond->qTrajectoryX;
            gond->qWorldY += gond->qTrajectoryY;

            sub_8003E0C(SE_GONDOLA);

            if (((gond->unk4A == 0) && (I(gond->qWorldX) >= gond->unk44)) || ((gond->unk4A == 1) && (I(gond->qWorldX) <= gond->unk44))) {
                gond->unk48 = 120; // TODO: Is it (DISPLAY_WIDTH/2)?
                gond->unk49 = 2;

                gond->qTrajectoryY = 0;
                gond->qTrajectoryX = 0;

                sub_8003E28(SE_GONDOLA);
            }
        } break;

        case 2: {
            ;
        } break;

        case 3: {
            gond->qTrajectoryY += Q(4. / 256.);
            gond->qWorldY += gond->qTrajectoryY;
        } break;

        default: {
            ;
        } break;
    }
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x24] # REFERENCE_.L28
         ldr r0, [r0, #0x0]
         ldrh r5, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r5, r0
         ldr r1, [pc, #0x1c] # REFERENCE_.L2c
         add r0, r5, r1
         ldrb r0, [r0, #0x0]
         cmp r0, #0x1
         beq .L3022
         cmp r0, #0x1
         ble .Lb081
         cmp r0, #0x2
         beq .Lb081
         cmp r0, #0x3
         beq .La073
         b .Lb081
         .hword 0x0
         .word gCurTask
         .word 0x3000049
     11mov r2, #0x34
         ldrsh r1, [r4, r2]
         ldr r0, [r4, #0x3c]
         add r0, r1
         str r0, [r4, #0x3c]
         mov r3, #0x36
         ldrsh r1, [r4, r3]
         ldr r0, [r4, #0x40]
         add r0, r1
         str r0, [r4, #0x40]
         ldr r0, [pc, #0x4c] # REFERENCE_.L94
         bl sub_8003E0C-0x4
         ldr r1, [pc, #0x4c] # REFERENCE_.L98
         add r0, r5, r1
         ldrb r2, [r0, #0x0]
         cmp r2, #0x0
         bne .L6447
         ldr r0, [r4, #0x3c]
         asr r0, #0x8
         ldr r3, [pc, #0x40] # REFERENCE_.L9c
         add r1, r5, r3
         mov r3, #0x0
         ldrsh r1, [r1, r3]
         cmp r0, r1
         bge .L7857
     38cmp r2, #0x1
         bne .Lb081
         ldr r0, [r4, #0x3c]
         asr r0, #0x8
         ldr r2, [pc, #0x2c] # REFERENCE_.L9c
         add r1, r5, r2
         mov r3, #0x0
         ldrsh r1, [r1, r3]
         cmp r0, r1
         bgt .Lb081
     46mov r1, r4
         add r1, #0x48
         mov r2, #0x0
         mov r0, #0x78
         strb r0, [r1, #0x0]
         add r1, #0x1
         mov r0, #0x2
         strb r0, [r1, #0x0]
         strh r2, [r4, #0x36]
         strh r2, [r4, #0x34]
         ldr r0, [pc, #0x4] # REFERENCE_.L94
         bl sub_8003E28-0x4
         b .Lb081
         .word 0x261
         .word 0x300004a
         .word 0x3000044
     17ldrh r0, [r4, #0x36]
         add r0, #0x4
         strh r0, [r4, #0x36]
         mov r0, #0x36
         ldrsh r1, [r4, r0]
         ldr r0, [r4, #0x40]
         add r0, r1
         str r0, [r4, #0x40]
     13pop {r4, r5}
         pop {r0}
         bx r0
```

## `Task_80983E8`

```c
void Task_80983E8(void)
{
    CharacterSelect *cs = TASK_DATA(gCurTask);
    s16 var_r0;
    u8 playerIndex;

    playerIndex = gStageData.playerIndex;

    if ((cs->createIndex != 0) && (cs->createIndex != 3)) {
        if (playerIndex == 0) {
            var_r0 = sub_8024074(0);
        } else {
            var_r0 = sub_8023E04();
        }

        cs->unk9 |= 0x10 & var_r0;
        if (var_r0 < 0) {
            sub_802613C();
            return;
        }
    }

    if (cs->unkE != 0) {
        gDispCnt |= DISPCNT_WIN0_ON;
        gWinRegs[WINREG_WIN0H] = WIN_RANGE(0, DISPLAY_WIDTH);
        gWinRegs[WINREG_WIN0V] = WIN_RANGE(0, DISPLAY_HEIGHT);
        gWinRegs[4] |= 0x3F;
        gWinRegs[5] |= 0x1F;
        gBldRegs.bldCnt = 0x3FFF;
        gBldRegs.bldY = 0x10;
        cs->qFadeBrightness = Q(16);
        cs->unkE = 0;
    }
    sub_809B13C(cs);

    if (cs->createIndex == 0 || cs->createIndex == 3 || (cs->createIndex == 1 && playerIndex == 0)
        || (cs->createIndex == 2 && playerIndex <= 1)) {
        sub_809B284(cs);
        sub_809AD74(cs);
    }

    sub_809ADF0(cs);
    sub_809AE50(cs);
    sub_809B69C(cs);
    sub_809B6C0(cs);

    if (gBldRegs.bldY != 0) {
        gBldRegs.bldY = I(cs->qFadeBrightness);
        cs->qFadeBrightness -= Q(1.0);
    } else {
        cs->unkE = 1;
        gBldRegs.bldY = 0;
        gCurTask->main = Task_8098DE4;
    }
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x24] # REFERENCE_.L28
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r0, [pc, #0x1c] # REFERENCE_.L2c
         ldrb r5, [r0, #0x6]
         ldrb r0, [r4, #0x7]
         cmp r0, #0x0
         beq .L4e34
         cmp r0, #0x3
         beq .L4e34
         cmp r5, #0x0
         bne .L3021
         mov r0, #0x0
         bl sub_8024074-0x4
         b .L3422
         .word gCurTask
         .word gStageData
     15bl sub_8023E04-0x4
     18lsl r0, #0x10
         lsr r2, r0, #0x10
         mov r0, #0x10
         and r0, r2
         ldrb r1, [r4, #0x9]
         orr r0, r1
         strb r0, [r4, #0x9]
         lsl r0, r2, #0x10
         cmp r0, #0x0
         bge .L4e34
         bl sub_802613C-0x4
         b .L112120
     11ldrh r0, [r4, #0xe]
         cmp r0, #0x0
         beq .L9067
         ldr r2, [pc, #0x98] # REFERENCE_.Lf0
         ldrh r0, [r2, #0x0]
         mov r3, #0x80
         lsl r3, #0x6
         mov r1, r3
         orr r0, r1
         strh r0, [r2, #0x0]
         ldr r1, [pc, #0x90] # REFERENCE_.Lf4
         mov r3, #0x0
         mov r0, #0xf0
         strh r0, [r1, #0x0]
         mov r0, #0xa0
         strh r0, [r1, #0x4]
         ldrh r2, [r1, #0x8]
         mov r0, #0x3f
         orr r0, r2
         strh r0, [r1, #0x8]
         ldrh r2, [r1, #0xa]
         mov r0, #0x1f
         orr r0, r2
         strh r0, [r1, #0xa]
         ldr r1, [pc, #0x78] # REFERENCE_.Lf8
         ldr r0, [pc, #0x78] # REFERENCE_.Lfc
         strh r0, [r1, #0x0]
         mov r0, #0x10
         strh r0, [r1, #0x4]
         mov r0, #0x80
         lsl r0, #0x5
         strh r0, [r4, #0x10]
         strh r3, [r4, #0xe]
     36mov r0, r4
         bl sub_809B13C-0x4
         ldrb r0, [r4, #0x7]
         cmp r0, #0x0
         beq .Lb082
         cmp r0, #0x3
         beq .Lb082
         cmp r0, #0x1
         bne .La878
         cmp r5, #0x0
         beq .Lb082
     75cmp r0, #0x2
         bne .Lbc86
         cmp r5, #0x1
         bhi .Lbc86
     71mov r0, r4
         bl sub_809B284-0x4
         mov r0, r4
         bl sub_809AD74-0x4
     79mov r0, r4
         bl sub_809ADF0-0x4
         mov r0, r4
         bl sub_809AE50-0x4
         mov r0, r4
         bl sub_809B69C-0x4
         mov r0, r4
         bl sub_809B6C0-0x4
         ldr r2, [pc, #0x20] # REFERENCE_.Lf8
         ldrh r1, [r2, #0x4]
         cmp r1, #0x0
         beq .L104113
         ldrh r0, [r4, #0x10]
         lsr r0, #0x8
         strh r0, [r2, #0x4]
         ldr r1, [pc, #0x1c] # REFERENCE_.L100
         mov r0, r1
         ldrh r3, [r4, #0x10]
         add r0, r3
         strh r0, [r4, #0x10]
         b .L112120
         .hword 0x0
         .word gDispCnt
         .word gWinRegs
         .word gBldRegs
         .word 0x3fff
         .word 0xffffff00
     97mov r0, #0x1
         strh r0, [r4, #0xe]
         strh r1, [r2, #0x4]
         ldr r0, [pc, #0xc] # REFERENCE_.L118
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.L11c
         str r0, [r1, #0x8]
     33pop {r4, r5}
         pop {r0}
         bx r0
         .word gCurTask
         .word Task_8098DE4
```

## `Task_GuruguruInit`

```c
void Task_GuruguruInit()
{
    Vec2_32 *temp_r1;
    u32 var_r4_2;
    u8 var_r4;

    GuruGuru *enemy = TASK_DATA(gCurTask);

    sub_80656B0(enemy);
    if (((u32)(u8)(gStageData.unk4 - 1) > 1U) && (gStageData.unk4 != 4)) {
        sub_8065544(enemy, &enemy->qPos, 0U);
    }

    for (var_r4 = 0; var_r4 < 4; var_r4++) {
        temp_r1 = &enemy->qUnk20[var_r4];
        sub_8065544(enemy, temp_r1, var_r4 + 1);
    }

    if (sub_8065884(enemy, enemy->s, &enemy->qUnk40) == 1) {
        TaskDestroy(gCurTask);
        return;
    }

    for (var_r4 = 0; var_r4 < 4; var_r4++) {
        s8 *meX;
        if (var_r4 != 0) {
            if (var_r4 < 2) {
                sub_8065884(enemy, &enemy->s[2], &enemy->qUnk20[var_r4]);
            } else {
                sub_8065884(enemy, &enemy->s[1], &enemy->qUnk20[var_r4]);
            }
        }

        // TODO: Macro?
        meX = &enemy->me->x;
        *meX = MAP_ENTITY_STATE_INITIALIZED;
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         ldr r0, [pc, #0x68] # REFERENCE_.L6c
         ldr r0, [r0, #0x0]
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r4, r0
         mov r0, r5
         bl sub_80656B0-0x4
         ldr r0, [pc, #0x58] # REFERENCE_.L70
         ldrb r1, [r0, #0x4]
         sub r0, r1, #0x1
         lsl r0, #0x18
         lsr r0, #0x18
         cmp r0, #0x1
         bls .L3223
         cmp r1, #0x4
         beq .L3223
         ldr r0, [pc, #0x4c] # REFERENCE_.L74
         add r1, r4, r0
         mov r0, r5
         mov r2, #0x0
         bl .Lbc84
     15mov r4, #0x0
         mov r7, r5
         add r7, #0x50
         mov r6, r5
         add r6, #0x40
     38lsl r1, r4, #0x3
         add r1, #0x20
         add r1, r5, r1
         add r4, #0x1
         lsl r4, #0x18
         lsr r4, #0x18
         mov r0, r5
         mov r2, r4
         bl .Lbc84
         cmp r4, #0x3
         bls .L3c28
         mov r0, r5
         mov r1, r7
         mov r2, r6
         bl sub_8065884-0x4
         cmp r0, #0x1
         bne .L7852
         ldr r0, [pc, #0x8] # REFERENCE_.L6c
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         b .Lb882
         .word gCurTask
         .word gStageData
         .word 0x3000048
     44mov r4, #0x0
     81cmp r4, #0x0
         beq .La472
         cmp r4, #0x1
         bhi .L9465
         lsl r2, r4, #0x3
         add r2, #0x20
         add r2, r5, r2
         mov r0, r5
         mov r1, r5
         add r1, #0xb0
         bl sub_8065884-0x4
         b .La472
     56lsl r2, r4, #0x3
         add r2, #0x20
         add r2, r5, r2
         mov r0, r5
         mov r1, r5
         add r1, #0x80
         bl sub_8065884-0x4
     54ldr r1, [r5, #0x0]
         mov r2, #0x2
         neg r2, r2
         mov r0, r2
         strb r0, [r1, #0x0]
         add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
         cmp r4, #0x3
         bls .L7a53
     48pop {r4, r5, r6, r7}
         pop {r0}
     22bx r0
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8068C38
sub_8068C38: @ 0x08068C38
	push {r4, r5, r6, lr}
	ldr r0, _08068CBC @ =gCurTask
	ldr r0, [r0]
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r4, r1, r0
	adds r0, #0xf0
	adds r6, r1, r0
	ldrh r0, [r4, #0x32]
	adds r0, #1
	strh r0, [r4, #0x32]
	adds r0, r4, #0
	bl sub_8069814
	adds r0, r4, #0
	bl sub_8069360
	adds r0, r4, #0
	bl sub_806A894
	ldr r0, [r4, #0x50]
	bl sub_8068E5C
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	ldr r0, [r4, #0x54]
	bl sub_8068E5C
	adds r0, r5, r0
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	ldrb r1, [r4, #0xd]
	movs r0, #0xd
	ldrsb r0, [r4, r0]
	cmp r0, #0
	beq _08068C96
	subs r0, r1, #1
	strb r0, [r4, #0xd]
	lsls r0, r0, #0x18
	cmp r0, #0
	bne _08068C96
	movs r0, #0x97
	lsls r0, r0, #3
	strh r0, [r6, #0xc]
	movs r0, #0
	strb r0, [r6, #0x1a]
_08068C96:
	cmp r5, #0
	beq _08068CA0
	adds r0, r4, #0
	bl sub_806A5DC
_08068CA0:
	ldrb r0, [r4, #0xc]
	cmp r0, #0
	bne _08068CDE
	ldr r1, _08068CC0 @ =gStageData
	ldrb r0, [r1, #3]
	cmp r0, #5
	bne _08068CD0
	ldrb r0, [r1, #6]
	cmp r0, #0
	beq _08068CC8
	ldr r0, _08068CBC @ =gCurTask
	ldr r1, [r0]
	ldr r0, _08068CC4 @ =sub_806A7A4
	b _08068CDC
	.align 2, 0
_08068CBC: .4byte gCurTask
_08068CC0: .4byte gStageData
_08068CC4: .4byte sub_806A7A4
_08068CC8:
	movs r0, #1
	movs r1, #0
	bl sub_8027674
_08068CD0:
	adds r0, r4, #0
	bl sub_806A818
	ldr r0, _08068CF8 @ =gCurTask
	ldr r1, [r0]
	ldr r0, _08068CFC @ =sub_806A760
_08068CDC:
	str r0, [r1, #8]
_08068CDE:
	adds r0, r4, #0
	bl sub_8069578
	adds r0, r4, #0
	bl sub_806A854
	adds r0, r4, #0
	bl sub_806A898
	pop {r4, r5, r6}
	pop {r0}
	bx r0
	.align 2, 0
_08068CF8: .4byte gCurTask
_08068CFC: .4byte sub_806A760
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
