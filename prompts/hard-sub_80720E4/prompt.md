You are decompiling an assembly function called `sub_80720E4` in ARMv4T from a Game Boy Advance game.

# Examples

## `Task_803DED0`

```c
void Task_803DED0(void)
{
    SlowChaosLift *lift = TASK_DATA(gCurTask);
    Sprite *s = &lift->s;
    s16 i;
    u8 arr[4];
    u32 res;

    s32 offY = sub_80517FC(I(lift->qWorldY), I(lift->qWorldX), 0, +8, arr, sub_805217C);

    if (offY <= 0) {
        lift->qWorldY += Q(offY);
        lift->unk64 = arr[0] * 4;
        lift->qUnk66 = Q(1.25);

        lift->qUnk68 = (COS(lift->unk64) * lift->qUnk66) >> 14;
        lift->qUnk6A = (SIN(lift->unk64) * lift->qUnk66) >> 14;

        lift->qWorldX += lift->qUnk68;
        lift->qWorldY += lift->qUnk6A;

        gCurTask->main = Task_803E0D8;
    } else {
        lift->qUnk6A = lift->qUnk66;
        lift->qWorldY += lift->qUnk6A;
        lift->qUnk66 += Q(0.1875);
    }

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        bool32 cond = FALSE;
        Player *p = GET_SP_PLAYER_V0(i);

        if (!sub_802C0D4(p)) {
            if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                if (lift->unk64 < Q(2)) {
                    p->qWorldY += Q(8);
                }

                p->qWorldX += lift->qUnk68;
                p->qWorldY += lift->qUnk6A;

                if (!(p->moveState & MOVESTATE_200) && (sub_801226C(p) < 0)) {
                    Player_HitWithoutRingsUpdate(p);
                } else {
                    cond = TRUE;
                }
            }

            res = sub_8020950(s, I(lift->qWorldX), I(lift->qWorldY), p, 1);

            if (res & 0x10000) {
                p->qWorldY += Q_8_8(res);

                if (!cond) {
                    p->qSpeedGround >>= 2;
                    p->qSpeedAirX >>= 2;
                    p->qSpeedAirY >>= 2;
                }
            }
        }
    }

    UpdateAnimOrDestroy();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0xa4] # REFERENCE_.Lb4
         mov r10, r0
         ldr r0, [r0, #0x0]
         ldrh r7, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r0, r7
         mov r8, r0
         ldr r1, [pc, #0x98] # REFERENCE_.Lb8
         add r1, r7
         mov r9, r1
         ldr r0, [r0, #0x60]
         asr r0, #0x8
         mov r2, r8
         ldr r1, [r2, #0x5c]
         asr r1, #0x8
         add r3, sp, #0x8
         str r3, [sp, #0x0]
         ldr r2, [pc, #0x88] # REFERENCE_.Lbc
         str r2, [sp, #0x4]
         mov r2, #0x0
         mov r3, #0x8
         bl sub_80517FC-0x4
         cmp r0, #0x0
         bgt .Ld898
         lsl r1, r0, #0x8
         mov r2, r8
         ldr r0, [r2, #0x60]
         add r0, r1
         str r0, [r2, #0x60]
         add r0, sp, #0x8
         ldrb r0, [r0, #0x0]
         lsl r0, #0x2
         ldr r3, [pc, #0x6c] # REFERENCE_.Lc0
         add r1, r7, r3
         strh r0, [r1, #0x0]
         ldr r0, [pc, #0x6c] # REFERENCE_.Lc4
         add r5, r7, r0
         mov r2, #0xa0
         lsl r2, #0x1
         strh r2, [r5, #0x0]
         ldr r4, [pc, #0x64] # REFERENCE_.Lc8
         ldrh r0, [r1, #0x0]
         mov r3, #0x80
         lsl r3, #0x1
         add r0, r3
         lsl r0, #0x1
         add r0, r4
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r2
         asr r0, #0xe
         ldr r2, [pc, #0x54] # REFERENCE_.Lcc
         add r3, r7, r2
         strh r0, [r3, #0x0]
         ldrh r0, [r1, #0x0]
         lsl r0, #0x1
         add r0, r4
         mov r2, #0x0
         ldrsh r1, [r0, r2]
         mov r2, #0x0
         ldrsh r0, [r5, r2]
         mul r0, r1
         asr r0, #0xe
         ldr r1, [pc, #0x40] # REFERENCE_.Ld0
         add r2, r7, r1
         strh r0, [r2, #0x0]
         mov r0, #0x0
         ldrsh r1, [r3, r0]
         mov r3, r8
         ldr r0, [r3, #0x5c]
         add r0, r1
         str r0, [r3, #0x5c]
         mov r0, #0x0
         ldrsh r1, [r2, r0]
         ldr r0, [r3, #0x60]
         add r0, r1
         str r0, [r3, #0x60]
         mov r2, r10
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x24] # REFERENCE_.Ld4
         str r0, [r1, #0x8]
         b .Lf6113
         .word gCurTask
         .word 0x300000c
         .word sub_805217C
         .word 0x3000064
         .word 0x3000066
         .word gSineTable
         .word 0x3000068
         .word 0x300006a
         .word Task_803E0D8
     30ldr r3, [pc, #0x2c] # REFERENCE_.L108
         add r2, r7, r3
         ldrh r1, [r2, #0x0]
         add r3, #0x4
         add r0, r7, r3
         strh r1, [r0, #0x0]
         mov r3, #0x0
         ldrsh r1, [r0, r3]
         mov r3, r8
         ldr r0, [r3, #0x60]
         add r0, r1
         str r0, [r3, #0x60]
         ldrh r0, [r2, #0x0]
         add r0, #0x30
         strh r0, [r2, #0x0]
     88mov r1, #0x0
     230mov r5, #0x0
         lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .L110124
         ldr r0, [pc, #0x8] # REFERENCE_.L10c
         ldrb r1, [r0, #0x6]
         b .L11a129
         .word 0x3000066
         .word gStageData
     118mov r0, r6
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     121lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x68] # REFERENCE_.L190
         add r6, r0, r1
         mov r0, r6
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L1e2223
         ldr r2, [r6, #0x4]
         mov r0, #0x20
         and r0, r2
         cmp r0, #0x0
         beq .L19a188
         ldr r0, [r6, #0x6c]
         cmp r0, r9
         bne .L19a188
         mov r0, r8
         add r0, #0x64
         ldrh r1, [r0, #0x0]
         ldr r0, [pc, #0x48] # REFERENCE_.L194
         cmp r1, r0
         bhi .L158159
         ldr r0, [r6, #0x14]
         mov r1, #0x80
         lsl r1, #0x4
         add r0, r1
         str r0, [r6, #0x14]
     153mov r0, r8
         add r0, #0x68
         mov r3, #0x0
         ldrsh r1, [r0, r3]
         ldr r0, [r6, #0x10]
         add r0, r1
         str r0, [r6, #0x10]
         mov r0, r8
         add r0, #0x6a
         mov r3, #0x0
         ldrsh r1, [r0, r3]
         ldr r0, [r6, #0x14]
         add r0, r1
         str r0, [r6, #0x14]
         mov r0, #0x80
         lsl r0, #0x2
         and r2, r0
         cmp r2, #0x0
         bne .L198187
         mov r0, r6
         bl sub_801226C-0x4
         cmp r0, #0x0
         bge .L198187
         mov r0, r6
         bl Player_HitWithoutRingsUpdate-0x4
         b .L19a188
         .word gPlayers
         .word 0x1ff
     177mov r5, #0x1
     144mov r0, r8
         ldr r1, [r0, #0x5c]
         asr r1, #0x8
         ldr r2, [r0, #0x60]
         asr r2, #0x8
         mov r0, #0x1
         str r0, [sp, #0x0]
         mov r0, r9
         mov r3, r6
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L1e2223
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r6, #0x14]
         add r0, r1
         str r0, [r6, #0x14]
         cmp r5, #0x0
         bne .L1e2223
         ldrh r0, [r6, #0x1c]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r6, #0x1c]
         ldrh r0, [r6, #0x18]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r6, #0x18]
         ldrh r0, [r6, #0x1a]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r6, #0x1a]
     139mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         bgt .L1f2231
         b .Lf8114
     229bl .L45c
         add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `Task_803E0D8`

```c
void Task_803E0D8(void)
{
    SlowChaosLift *lift = TASK_DATA(gCurTask);
    Sprite *s = &lift->s;
    s32 r4 = I((lift->unk64 + Q(0.5)) & ONE_CYCLE);
    u8 arr[4];
    s16 i;

#ifndef NON_MATCHING
    register s32 r0 asm("r0") = r4;
    register s32 r1 asm("r1");
    register s32 r2 asm("r2");
#else
    s32 r0 = r4;
    s32 r1;
    s32 r2;
#endif

    switch (r0) {
        case 0: {
            r2 = sub_80517FC(I(lift->qWorldY), I(lift->qWorldX), 0, +8, arr, sub_805217C);
        } break;

        case 1: {
            r2 = sub_80517FC(I(lift->qWorldX), I(lift->qWorldY), 0, -8, arr, sub_805203C);
        } break;

        case 2: {
            r2 = sub_80517FC(I(lift->qWorldY), I(lift->qWorldX), 0, -8, arr, sub_805217C);
        } break;

        case 3: {
            r2 = sub_80517FC(I(lift->qWorldX), I(lift->qWorldY), 0, +8, arr, sub_805203C);
        } break;
    }

    r0 = r4;
    switch (r0) {
        case 0: {
            r1 = Q(r2);
            lift->qWorldY += r1;
        } break;

        case 1: {
            r1 = Q(r2);
            lift->qWorldX -= r1;
        } break;

        case 2: {
            r1 = Q(r2);
            lift->qWorldY -= r1;
        } break;

        case 3: {
            r1 = Q(r2);
            lift->qWorldX += r1;
        } break;
    }

    lift->unk64 = arr[0] * 4;
    lift->qUnk66 = Q(1.25);

    lift->qUnk68 = (COS(lift->unk64) * lift->qUnk66) >> 14;
    lift->qUnk6A = (SIN(lift->unk64) * lift->qUnk66) >> 14;

    lift->qWorldX += lift->qUnk68;
    lift->qWorldY += lift->qUnk6A;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        bool32 cond = FALSE;
        Player *p = GET_SP_PLAYER_V0(i);
        u32 res;

        if (!sub_802C0D4(p)) {
            if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                p->qWorldY += Q(2);

                p->qWorldX += lift->qUnk68;
                p->qWorldY += lift->qUnk6A;

                if (sub_801226C(p) < 0) {
                    Player_HitWithoutRingsUpdate(p);
                } else {
                    cond = TRUE;
                }
            }

            res = sub_8020950(s, I(lift->qWorldX), I(lift->qWorldY), p, 1);

            if (res & 0x10000) {
                p->qWorldY += Q_8_8(res);

                if (!cond) {
                    p->qSpeedGround >>= 2;
                    p->qSpeedAirX >>= 2;
                    p->qSpeedAirY >>= 2;
                }
            }
        }
    }

    UpdateAnimOrDestroy();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0x2c] # REFERENCE_.L3c
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r6, r0, r1
         add r1, #0xc
         add r1, r0
         mov r8, r1
         ldr r3, [pc, #0x20] # REFERENCE_.L40
         add r0, r3
         ldrh r0, [r0, #0x0]
         add r0, #0x80
         ldr r1, [pc, #0x1c] # REFERENCE_.L44
         and r0, r1
         lsr r4, r0, #0x8
         mov r0, r4
         cmp r0, #0x1
         beq .L6848
         cmp r0, #0x1
         bgt .L4833
         cmp r0, #0x0
         beq .L5238
         b .Lba86
         .word gCurTask
         .word 0x3000064
         .word 0x3ff
     26cmp r0, #0x2
         beq .L8461
         cmp r0, #0x3
         beq .La074
         b .Lba86
     28ldr r0, [r6, #0x60]
         asr r0, #0x8
         ldr r1, [r6, #0x5c]
         asr r1, #0x8
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L64
         b .Lae81
         .hword 0x0
         .word sub_805217C
     24ldr r0, [r6, #0x5c]
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L80
         str r2, [sp, #0x4]
         mov r2, #0x0
         b .Lb484
         .word sub_805203C
     34ldr r0, [r6, #0x60]
         asr r0, #0x8
         ldr r1, [r6, #0x5c]
         asr r1, #0x8
         mov r3, #0x8
         neg r3, r3
         add r2, sp, #0x8
         str r2, [sp, #0x0]
         ldr r2, [pc, #0x4] # REFERENCE_.L9c
         str r2, [sp, #0x4]
         mov r2, #0x0
         b .Lb484
         .word sub_805217C
     36ldr r0, [r6, #0x5c]
         asr r0, #0x8
         ldr r1, [r6, #0x60]
         asr r1, #0x8
         add r3, sp, #0x8
         str r3, [sp, #0x0]
         ldr r2, [pc, #0x1c] # REFERENCE_.Lcc
     45str r2, [sp, #0x4]
         mov r2, #0x0
         mov r3, #0x8
     59bl sub_80517FC-0x4
         mov r2, r0
     29mov r0, r4
         cmp r0, #0x1
         beq .Le4106
         cmp r0, #0x1
         bgt .Ld096
         cmp r0, #0x0
         beq .Lda101
         b .Lfe119
         .hword 0x0
         .word sub_805203C
     90cmp r0, #0x2
         beq .Lec110
         cmp r0, #0x3
         beq .Lf6115
         b .Lfe119
     92lsl r1, r2, #0x8
         ldr r0, [r6, #0x60]
         add r0, r1
         str r0, [r6, #0x60]
         b .Lfe119
     88lsl r1, r2, #0x8
         ldr r0, [r6, #0x5c]
         sub r0, r1
         b .Lfc118
     97lsl r1, r2, #0x8
         ldr r0, [r6, #0x60]
         sub r0, r1
         str r0, [r6, #0x60]
         b .Lfe119
     99lsl r1, r2, #0x8
         ldr r0, [r6, #0x5c]
         add r0, r1
     109str r0, [r6, #0x5c]
     93add r0, sp, #0x8
         ldrb r0, [r0, #0x0]
         lsl r0, #0x2
         mov r1, r6
         add r1, #0x64
         strh r0, [r1, #0x0]
         mov r4, #0x66
         add r4, r6
         mov r12, r4
         mov r2, #0xa0
         lsl r2, #0x1
         strh r2, [r4, #0x0]
         ldr r4, [pc, #0x60] # REFERENCE_.L178
         ldrh r0, [r1, #0x0]
         mov r3, #0x80
         lsl r3, #0x1
         add r0, r3
         lsl r0, #0x1
         add r0, r4
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r2
         asr r0, #0xe
         mov r3, r6
         add r3, #0x68
         strh r0, [r3, #0x0]
         ldrh r0, [r1, #0x0]
         lsl r0, #0x1
         add r0, r4
         mov r4, #0x0
         ldrsh r1, [r0, r4]
         mov r2, r12
         mov r4, #0x0
         ldrsh r0, [r2, r4]
         mul r0, r1
         asr r0, #0xe
         mov r2, r6
         add r2, #0x6a
         strh r0, [r2, #0x0]
         mov r0, #0x0
         ldrsh r1, [r3, r0]
         ldr r0, [r6, #0x5c]
         add r0, r1
         str r0, [r6, #0x5c]
         mov r4, #0x0
         ldrsh r1, [r2, r4]
         ldr r0, [r6, #0x60]
         add r0, r1
         str r0, [r6, #0x60]
         mov r1, #0x0
         mov r10, r3
         mov r9, r2
     271mov r7, #0x0
         lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .L180182
         ldr r0, [pc, #0x8] # REFERENCE_.L17c
         ldrb r1, [r0, #0x6]
         b .L18a187
         .hword 0x0
         .word gSineTable
         .word gStageData
     175mov r0, r5
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     178lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x4c] # REFERENCE_.L1e4
         add r5, r0, r1
         mov r0, r5
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L230265
         ldr r0, [r5, #0x4]
         mov r1, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .L1ea231
         ldr r0, [r5, #0x6c]
         cmp r0, r8
         bne .L1ea231
         ldr r1, [r5, #0x14]
         mov r0, #0x80
         lsl r0, #0x2
         add r1, r0
         str r1, [r5, #0x14]
         mov r3, r10
         mov r0, #0x0
         ldrsh r2, [r3, r0]
         ldr r0, [r5, #0x10]
         add r0, r2
         str r0, [r5, #0x10]
         mov r2, r9
         mov r3, #0x0
         ldrsh r0, [r2, r3]
         add r1, r0
         str r1, [r5, #0x14]
         mov r0, r5
         bl sub_801226C-0x4
         cmp r0, #0x0
         bge .L1e8230
         mov r0, r5
         bl Player_HitWithoutRingsUpdate-0x4
         b .L1ea231
         .word gPlayers
     225mov r7, #0x1
     202ldr r1, [r6, #0x5c]
         asr r1, #0x8
         ldr r2, [r6, #0x60]
         asr r2, #0x8
         mov r0, #0x1
         str r0, [sp, #0x0]
         mov r0, r8
         mov r3, r5
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L230265
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r5, #0x14]
         add r0, r1
         str r0, [r5, #0x14]
         cmp r7, #0x0
         bne .L230265
         ldrh r0, [r5, #0x1c]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x1c]
         ldrh r0, [r5, #0x18]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x18]
         ldrh r0, [r5, #0x1a]
         lsl r0, #0x10
         asr r0, #0x12
         strh r0, [r5, #0x1a]
     197mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .L166171
         bl .L254
         add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `sub_8038988`

```c
static void sub_8038988(void)
{
    ButtonPlatform *platform = TASK_DATA(gCurTask);
    Sprite *s = &platform->s;
    MapEntity *me = platform->base.me;
    Player *p;
    s32 qWorldX, qWorldY; // BUG: uninitialized, copy-paste error?
    s16 i, j;

#ifndef BUG_FIX
    s16 spawnX, spawnY;
    spawnX = TO_WORLD_POS(platform->base.meX, platform->base.regionX);
    spawnY = TO_WORLD_POS(me->y, platform->base.regionY);
#else
    s32 spawnX, spawnY;
    spawnX = TO_WORLD_POS(platform->base.meX, platform->base.regionX);
    spawnY = TO_WORLD_POS(me->y, platform->base.regionY);

    // BUG: These are uninitialized usually
    qWorldX = Q(spawnX);
    qWorldY = Q(spawnY);
#endif

    s->x = I(platform->qWorldX) - gCamera.x;
    s->y = I(platform->qWorldY) - gCamera.y;

    if (!sub_802C140(spawnX, spawnY, s->x, s->y)) {
        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            p = GET_SP_PLAYER_V1(i);

            ResolvePlayerSpriteCollision(s, p);
        }

        SET_MAP_ENTITY_NOT_INITIALIZED(me, platform->base.meX);
        TaskDestroy(gCurTask);
        return;
    }

    if (GetBit(gStageData.platformTimerEnableBits, platform->timerId)) {
        s32 qPathTop, qPathBottom;
        s32 qPathLeft, qPathRight;
        s32 qPathHalfWidth, qPathHalfHeight;
        s32 qPathMiddleX, qPathMiddleY;

        if (!platform->isActive) {
            s->variant = 1;
            platform->isActive = TRUE;

            platform->theta = ((gStageData.timer + (platform->unk3C >> 2)) & 0xFF) << 2;

            qPathTop = qWorldY + Q(me->d.sData[1] * TILE_WIDTH);
            qPathHalfHeight = Q(me->d.uData[3] * (TILE_WIDTH / 2));
            qPathLeft = qWorldX + Q(me->d.sData[0] * TILE_WIDTH);
            qPathHalfWidth = Q(me->d.uData[2] * (TILE_WIDTH / 2));
            qPathMiddleX = qPathLeft + qPathHalfWidth;
            qPathMiddleY = qPathTop + qPathHalfHeight;

            platform->qWorldX = qPathMiddleX + ((SIN(platform->theta) * qPathHalfWidth) >> 14);
            platform->qWorldY = qPathMiddleY + ((SIN(platform->theta) * qPathHalfHeight) >> 14);

            s->x = I(platform->qWorldX) - gCamera.x;
            s->y = I(platform->qWorldY) - gCamera.y;
        } else if ((gStageData.platformTimers[platform->timerId] < ZONE_TIME_TO_INT(0, 2))) {
            if (s->variant != 2) {
                s->variant = 2;
            }
        } else if (s->variant == 2) {
            s->variant = 0;
        }
    } else if (platform->isActive == TRUE) {
        platform->isActive = FALSE;

        for (j = 0; j < NUM_SINGLE_PLAYER_CHARS; j++) {
            p = GET_SP_PLAYER_V0(j);
            ResolvePlayerSpriteCollision(s, p);
        }
    }

    if (platform->isActive != FALSE) {
        u16 cmdRes = UpdateSpriteAnimation(s);

        if ((cmdRes == ACMD_RESULT__ENDED) && (s->variant == 1)) {
            s->variant = 0;
        }

        DisplaySprite(s);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x10
         ldr r0, [pc, #0x80] # REFERENCE_.L90
         ldr r0, [r0, #0x0]
         ldrh r5, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r7, r5, r0
         add r0, #0xc
         add r6, r5, r0
         ldr r1, [r7, #0x0]
         mov r8, r1
         ldrb r0, [r7, #0xa]
         lsl r0, #0x3
         ldrh r1, [r7, #0x4]
         lsl r1, #0x8
         add r0, r1
         mov r2, r8
         ldrb r1, [r2, #0x1]
         lsl r1, #0x3
         ldrh r2, [r7, #0x6]
         lsl r2, #0x8
         add r1, r2
         ldr r2, [r7, #0x34]
         asr r2, #0x8
         mov r12, r2
         ldr r3, [pc, #0x54] # REFERENCE_.L94
         mov r9, r3
         ldr r2, [r3, #0x0]
         mov r3, r12
         sub r3, r2
         mov r2, #0x0
         mov r10, r2
         strh r3, [r6, #0x10]
         ldr r2, [r7, #0x38]
         asr r2, #0x8
         mov r3, r9
         ldr r3, [r3, #0x4]
         sub r2, r3
         strh r2, [r6, #0x12]
         lsl r0, #0x10
         asr r0, #0x10
         lsl r1, #0x10
         asr r1, #0x10
         mov r3, #0x10
         ldrsh r2, [r6, r3]
         str r2, [sp, #0xc]
         mov r3, #0x12
         ldrsh r2, [r6, r3]
         mov r12, r2
         ldr r2, [sp, #0xc]
         mov r3, r12
         bl sub_802C140-0x4
         cmp r0, #0x0
         bne .Le0104
         mov r1, #0x0
         ldr r2, [pc, #0x1c] # REFERENCE_.L98
     93lsl r0, r1, #0x10
         mov r5, r0
         cmp r5, #0x0
         beq .L9c74
         mov r0, r4
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .La076
         .word gCurTask
         .word gCamera
         .word gPlayers
     64ldr r0, [pc, #0x38] # REFERENCE_.Ld8
         ldrb r1, [r0, #0x6]
     70lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r4, r0, r2
         mov r0, r6
         mov r1, r4
         str r2, [sp, #0x8]
         bl ResolvePlayerSpriteCollision-0x4
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r5, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         ldr r2, [sp, #0x8]
         cmp r0, #0x1
         ble .L7c61
         ldrb r0, [r7, #0xa]
         mov r2, r8
         strb r0, [r2, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Ldc
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         b .L236265
         .hword 0x0
         .word gStageData
         .word gCurTask
     58ldr r3, [pc, #0x98] # REFERENCE_.L17c
         mov r0, r3
         add r0, #0x2c
         ldrb r0, [r0, #0x0]
         ldr r2, [pc, #0x94] # REFERENCE_.L180
         add r1, r5, r2
         ldrb r2, [r1, #0x0]
         asr r0, r2
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L1b6207
         ldr r4, [pc, #0x88] # REFERENCE_.L184
         add r4, r5
         mov r12, r4
         ldrb r0, [r4, #0x0]
         cmp r0, #0x0
         bne .L18c186
         strb r1, [r6, #0x1a]
         strb r1, [r4, #0x0]
         ldr r1, [r3, #0x1c]
         ldrh r0, [r7, #0x3c]
         lsr r0, #0x2
         add r1, r0
         mov r0, #0xff
         and r1, r0
         lsl r1, #0x2
         strh r1, [r7, #0x3e]
         mov r0, r8
         mov r3, #0x4
         ldrsb r3, [r0, r3]
         lsl r3, #0xb
         ldr r1, [sp, #0x4]
         add r3, r1, r3
         ldrb r4, [r0, #0x6]
         lsl r4, #0xa
         mov r1, #0x3
         ldrsb r1, [r0, r1]
         lsl r1, #0xb
         ldr r2, [sp, #0x0]
         add r1, r2, r1
         ldrb r2, [r0, #0x5]
         lsl r2, #0xa
         add r1, r2
         add r3, r4
         mov r8, r3
         ldr r5, [pc, #0x48] # REFERENCE_.L188
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r2
         asr r0, #0xe
         add r1, r0
         str r1, [r7, #0x34]
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r2, #0x0
         ldrsh r0, [r0, r2]
         mul r0, r4
         asr r0, #0xe
         mov r4, r8
         add r3, r4, r0
         str r3, [r7, #0x38]
         asr r1, #0x8
         mov r2, r9
         ldr r0, [r2, #0x0]
         sub r1, r0
         strh r1, [r6, #0x10]
         ldr r0, [r7, #0x38]
         asr r0, #0x8
         ldr r1, [r2, #0x4]
         sub r0, r1
         strh r0, [r6, #0x12]
         mov r7, r12
         b .L214250
         .word gStageData
         .word 0x3000042
         .word 0x3000043
         .word gSineTable
     121lsl r0, r2, #0x1
         mov r1, r3
         add r1, #0x2e
         add r0, r1
         ldrh r0, [r0, #0x0]
         cmp r0, #0x77
         bhi .L1a8200
         ldrb r0, [r6, #0x1a]
         mov r7, r12
         cmp r0, #0x2
         beq .L214250
         mov r0, #0x2
         strb r0, [r6, #0x1a]
         b .L214250
     192ldrb r0, [r6, #0x1a]
         mov r7, r12
         cmp r0, #0x2
         bne .L214250
         mov r3, r10
         strb r3, [r6, #0x1a]
         b .L214250
     115ldr r1, [pc, #0x20] # REFERENCE_.L1d8
         add r0, r5, r1
         ldrb r1, [r0, #0x0]
         mov r7, r0
         cmp r1, #0x1
         bne .L214250
         mov r2, r10
         strb r2, [r7, #0x0]
         mov r1, #0x0
         ldr r2, [pc, #0x10] # REFERENCE_.L1dc
     249lsl r0, r1, #0x10
         mov r5, r0
         cmp r5, #0x0
         bne .L1e4227
         ldr r0, [pc, #0xc] # REFERENCE_.L1e0
         ldrb r1, [r0, #0x6]
         b .L1ee232
         .word 0x3000043
         .word gPlayers
         .word gStageData
     220mov r0, r4
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     223lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r4, r0, r2
         mov r0, r6
         mov r1, r4
         str r2, [sp, #0x8]
         bl ResolvePlayerSpriteCollision-0x4
         mov r3, #0x80
         lsl r3, #0x9
         add r0, r5, r3
         lsr r1, r0, #0x10
         asr r0, #0x10
         ldr r2, [sp, #0x8]
         cmp r0, #0x1
         ble .L1ca217
     181ldrb r0, [r7, #0x0]
         cmp r0, #0x0
         beq .L236265
         mov r0, r6
         bl UpdateSpriteAnimation-0x4
         lsl r0, #0x10
         lsr r1, r0, #0x10
         cmp r1, #0x0
         bne .L230263
         ldrb r0, [r6, #0x1a]
         cmp r0, #0x1
         bne .L230263
         strb r1, [r6, #0x1a]
     258mov r0, r6
         bl DisplaySprite-0x4
     100add sp, #0x10
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `sub_803EA98`

```c
void sub_803EA98(void)
{
    PlatformAttached *platform = TASK_DATA(gCurTask);
    Sprite *s = &platform->s;
    Player *p;
    s32 dx, dy;
    s32 qDirX, qDirY;
    u8 i;

    dx = platform->qWorldX;
    dy = platform->qWorldY;

    qDirX = SIN_24_8(platform->angle);
    qDirY = COS_24_8(platform->angle);

    platform->qWorldX = (platform->qHookWorldX + Q_MUL(qDirX, platform->qRadius));
    platform->qWorldY = (platform->qHookWorldY + Q_MUL(qDirY, platform->qRadius));

    dx = dx - platform->qWorldX;
    dy = dy - platform->qWorldY;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        p = GET_SP_PLAYER_V1(i);

        if (((p->charFlags.someIndex == 1) || (p->charFlags.someIndex == 2) || (p->charFlags.someIndex == 4)) && !sub_802C0D4(p)) {
            u32 res;

            if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                p->qWorldX -= dx;
                p->qWorldY -= dy;

                if (p->moveState & MOVESTATE_GRAVITY_SWITCHED) {
                    p->qWorldY -= Q(1);
                } else {
                    p->qWorldY += Q(1);
                }
            }

            res = sub_8020950(s, I(platform->qWorldX), I(platform->qWorldY), p, 0);
            if (res & 0x10000) {
                p->qWorldY += Q_8_8(res);
            }
        }
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x4
         ldr r0, [pc, #0x74] # REFERENCE_.L80
         ldr r0, [r0, #0x0]
         ldrh r3, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r6, r3, r0
         add r0, #0xc
         add r0, r3
         mov r8, r0
         ldr r1, [r6, #0x6c]
         mov r9, r1
         ldr r7, [r6, #0x70]
         ldr r4, [pc, #0x60] # REFERENCE_.L84
         ldr r2, [pc, #0x60] # REFERENCE_.L88
         add r0, r3, r2
         ldrh r1, [r0, #0x0]
         lsl r0, r1, #0x1
         add r0, r4
         ldrh r2, [r0, #0x0]
         lsl r2, #0x10
         asr r2, #0x16
         mov r0, #0x80
         lsl r0, #0x1
         add r1, r0
         lsl r1, #0x1
         add r1, r4
         ldrh r1, [r1, #0x0]
         lsl r1, #0x10
         asr r1, #0x16
         ldr r4, [pc, #0x44] # REFERENCE_.L8c
         add r3, r4
         mov r4, #0x0
         ldrsh r0, [r3, r4]
         mul r0, r2
         asr r0, #0x8
         ldr r2, [r6, #0x74]
         add r2, r0
         str r2, [r6, #0x6c]
         mov r4, #0x0
         ldrsh r0, [r3, r4]
         mul r0, r1
         asr r0, #0x8
         ldr r1, [r6, #0x78]
         add r1, r0
         str r1, [r6, #0x70]
         mov r0, r9
         sub r0, r2
         mov r9, r0
         sub r7, r1
         mov r4, #0x0
     146cmp r4, #0x0
         beq .L9068
         mov r0, r5
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .L9470
         .hword 0x0
         .word gCurTask
         .word gSineTable
         .word 0x3000080
         .word 0x300007e
     56ldr r0, [pc, #0x5c] # REFERENCE_.Lf0
         ldrb r1, [r0, #0x6]
     62lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x54] # REFERENCE_.Lf4
         add r5, r0, r1
         mov r0, r5
         add r0, #0x2b
         ldrb r0, [r0, #0x0]
         mov r1, #0x1c
         and r1, r0
         cmp r1, #0x4
         beq .Lb888
         cmp r1, #0x8
         beq .Lb888
         cmp r1, #0x10
         bne .L12e142
     83mov r0, r5
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L12e142
         ldr r2, [r5, #0x4]
         mov r0, #0x20
         and r0, r2
         cmp r0, #0x0
         beq .L104122
         ldr r0, [r5, #0x6c]
         cmp r0, r8
         bne .L104122
         ldr r0, [r5, #0x10]
         mov r1, r9
         sub r0, r1
         str r0, [r5, #0x10]
         ldr r0, [r5, #0x14]
         sub r1, r0, r7
         str r1, [r5, #0x14]
         mov r0, #0x80
         lsl r0, #0x9
         and r2, r0
         cmp r2, #0x0
         beq .Lfc118
         ldr r2, [pc, #0xc] # REFERENCE_.Lf8
         b .L100120
         .hword 0x0
         .word gStageData
         .word gPlayers
         .word 0xffffff00
     111mov r2, #0x80
         lsl r2, #0x1
     113add r0, r1, r2
         str r0, [r5, #0x14]
     96ldr r1, [r6, #0x6c]
         asr r1, #0x8
         ldr r2, [r6, #0x70]
         asr r2, #0x8
         mov r0, #0x0
         str r0, [sp, #0x0]
         mov r0, r8
         mov r3, r5
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L12e142
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r5, #0x14]
         add r0, r1
         str r0, [r5, #0x14]
     87add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
         cmp r4, #0x1
         bls .L6e55
         add sp, #0x4
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `Task_ButtonPlatformInit`

```c
static void Task_ButtonPlatformInit(void)
{
    ButtonPlatform *platform = TASK_DATA(gCurTask);
    s16 sl = 0;
    Sprite *s = &platform->s;
    MapEntity *me = platform->base.me;
    s16 i;
    s32 qWorldX, qWorldY;
    s32 dx, dy;
    s32 qPathTop, qPathBottom;
    s32 qPathLeft, qPathRight;
    s32 qPathHalfWidth, qPathHalfHeight;
    s32 qPathMiddleX, qPathMiddleY;

    if (platform->isActive == TRUE) {
        qWorldX = Q(TO_WORLD_POS(platform->base.meX, platform->base.regionX));
        qWorldY = Q(TO_WORLD_POS(me->y, platform->base.regionY));

        platform->theta = ((gStageData.timer + (platform->unk3C >> 2)) & 0xFF) << 2;

        qPathTop = qWorldY + Q(me->d.sData[1] * TILE_WIDTH);
        qPathHalfHeight = Q(me->d.uData[3] * (TILE_WIDTH / 2));
        qPathLeft = qWorldX + Q(me->d.sData[0] * TILE_WIDTH);
        qPathHalfWidth = Q(me->d.uData[2] * (TILE_WIDTH / 2));
        qPathMiddleX = qPathLeft + qPathHalfWidth;
        qPathMiddleY = qPathTop + qPathHalfHeight;

        {
            dx = platform->qWorldX;
            dy = platform->qWorldY;

            platform->qWorldX = qPathMiddleX + ((SIN(platform->theta) * qPathHalfWidth) >> 14);
            platform->qWorldY = qPathMiddleY + ((SIN(platform->theta) * qPathHalfHeight) >> 14);

            dx = dx - platform->qWorldX;
            dy = dy - platform->qWorldY;
        }

        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            Player *p = GET_SP_PLAYER_V0(i);
            u32 res;

            if (!sub_802C0D4(p)) {
                if ((p->moveState & MOVESTATE_COLLIDING_ENT) && (p->sprColliding == s)) {
                    p->qWorldX -= dx;
                    p->qWorldY -= dy - Q(4);

                    sl = +1;
                } else if (sl == 0) {
                    sl = -1;
                }

                // NOTE/BUG?: I(...) on integer values
                res = sub_8020950(s, I(platform->qWorldX), I(platform->qWorldY), p, 0);

                if (res & 0x10000) {
                    p->qWorldY += Q_8_8(res);
                }
            }
        }

        if (sl != 0) {
            if ((sl == +1) && (platform->unk40 < 16)) {
                platform->unk40++;
            } else if ((sl == -1) && (platform->unk40 > 0)) {
                platform->unk40--;
            }
        }

        platform->qWorldY += (SIN(platform->unk40 * 16) >> 5);
    }

    sub_8038988();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0xc
         ldr r0, [pc, #0xbc] # REFERENCE_.Lcc
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r12, r0
         mov r0, #0xc0
         lsl r0, #0x12
         mov r1, r12
         add r7, r1, r0
         mov r3, #0x0
         mov r10, r3
         add r0, #0xc
         add r0, r12
         str r0, [sp, #0x4]
         ldr r5, [r7, #0x0]
         ldr r0, [pc, #0xa4] # REFERENCE_.Ld0
         add r0, r12
         ldrb r0, [r0, #0x0]
         cmp r0, #0x1
         beq .L3426
         b .L1bc213
     24ldrb r3, [r7, #0xa]
         lsl r3, #0x3
         ldrh r0, [r7, #0x4]
         lsl r0, #0x8
         add r3, r0
         lsl r3, #0x8
         ldrb r2, [r5, #0x1]
         lsl r2, #0x3
         ldrh r0, [r7, #0x6]
         lsl r0, #0x8
         add r2, r0
         lsl r2, #0x8
         ldr r0, [pc, #0x84] # REFERENCE_.Ld4
         ldr r1, [r0, #0x1c]
         ldrh r0, [r7, #0x3c]
         lsr r0, #0x2
         add r1, r0
         mov r0, #0xff
         and r1, r0
         lsl r1, #0x2
         strh r1, [r7, #0x3e]
         mov r0, #0x4
         ldrsb r0, [r5, r0]
         lsl r0, #0xb
         add r2, r0
         ldrb r4, [r5, #0x6]
         lsl r4, #0xa
         mov r0, #0x3
         ldrsb r0, [r5, r0]
         lsl r0, #0xb
         add r3, r0
         ldrb r1, [r5, #0x5]
         lsl r1, #0xa
         add r3, r1
         str r3, [sp, #0x8]
         add r2, r4
         ldr r3, [r7, #0x34]
         mov r9, r3
         ldr r0, [r7, #0x38]
         mov r8, r0
         ldr r5, [pc, #0x50] # REFERENCE_.Ld8
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         mul r0, r1
         asr r0, #0xe
         ldr r1, [sp, #0x8]
         add r3, r1, r0
         str r3, [r7, #0x34]
         ldrh r0, [r7, #0x3e]
         lsl r0, #0x1
         add r0, r5
         mov r1, #0x0
         ldrsh r0, [r0, r1]
         mul r0, r4
         asr r0, #0xe
         add r2, r0
         str r2, [r7, #0x38]
         mov r0, r9
         sub r0, r3
         mov r9, r0
         mov r1, r8
         sub r1, r2
         mov r8, r1
         mov r1, #0x0
         ldr r5, [pc, #0x20] # REFERENCE_.Ldc
         add r5, r12
     178lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .Le0107
         ldr r0, [pc, #0xc] # REFERENCE_.Ld4
         ldrb r1, [r0, #0x6]
         b .Lea112
         .word gCurTask
         .word 0x3000043
         .word gStageData
         .word gSineTable
         .word 0x3000040
     98mov r0, r6
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
     101lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x38] # REFERENCE_.L130
         add r6, r0, r1
         mov r0, r6
         bl sub_802C0D4-0x4
         cmp r0, #0x0
         bne .L168172
         ldr r0, [r6, #0x4]
         mov r1, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .L134147
         ldr r0, [r6, #0x6c]
         ldr r3, [sp, #0x4]
         cmp r0, r3
         bne .L134147
         ldr r0, [r6, #0x10]
         mov r1, r9
         sub r0, r1
         str r0, [r6, #0x10]
         ldr r0, [r6, #0x14]
         mov r3, #0x80
         lsl r3, #0x3
         add r0, r3
         mov r1, r8
         sub r0, r1
         str r0, [r6, #0x14]
         mov r3, #0x1
         mov r10, r3
         b .L13e152
         .word gPlayers
     127mov r0, r10
         cmp r0, #0x0
         bne .L13e152
         ldr r1, [pc, #0x54] # REFERENCE_.L190
         mov r10, r1
     145ldr r1, [r7, #0x34]
         asr r1, #0x8
         ldr r2, [r7, #0x38]
         asr r2, #0x8
         mov r0, #0x0
         str r0, [sp, #0x0]
         ldr r0, [sp, #0x4]
         mov r3, r6
         bl sub_8020950-0x4
         mov r1, r0
         mov r0, #0x80
         lsl r0, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L168172
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r6, #0x14]
         add r0, r1
         str r0, [r6, #0x14]
     122mov r3, #0x80
         lsl r3, #0x9
         add r0, r4, r3
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .Lbe95
         mov r1, r10
         lsl r0, r1, #0x10
         asr r2, r0, #0x10
         mov r1, r0
         cmp r2, #0x0
         beq .L1a8203
         cmp r2, #0x1
         bne .L194193
         ldrb r0, [r5, #0x0]
         cmp r0, #0xf
         bhi .L194193
         add r0, #0x1
         b .L1a6202
         .word 0xffff
     186asr r1, #0x10
         mov r0, #0x1
         neg r0, r0
         cmp r1, r0
         bne .L1a8203
         ldrb r0, [r5, #0x0]
         cmp r0, #0x0
         beq .L1a8203
         sub r0, #0x1
     191strb r0, [r5, #0x0]
     184ldr r1, [pc, #0x24] # REFERENCE_.L1d0
         ldrb r0, [r5, #0x0]
         lsl r0, #0x5
         add r0, r1
         ldrh r1, [r0, #0x0]
         lsl r1, #0x10
         asr r1, #0x15
         ldr r0, [r7, #0x38]
         add r0, r1
         str r0, [r7, #0x38]
     25bl .L24c
         add sp, #0xc
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gSineTable
```

# Declarations for the functions called from the target assembly

- `void m4aSongNumStart(u16);`
- `AnimCmdResult UpdateSpriteAnimation(Sprite *);`

# Types definitions used in the declarations

```c
typedef AnimCmdResult (*AnimationCommandFunc)(void *cursor, Sprite *sprite);
```

```c
typedef struct {
    /* 0x00 */ u8 *tiles; // in VRAM
    /* 0x04 */ u32 frameNum;

    // Bitfield description from KATAM decomp
    /* 0x08 */ u32 frameFlags; // bit 0-4: affine-index / rotscale param selection
                               // bit 5: rotscale enable
                               // bit 6: rotscale double-size
                               // bit 7-8: obj mode -- different (1 bit) in SA3?
                               // bit 9
                               // bit 10 X-Flip
                               // bit 11 Y-Flip
                               // bit 12-13: priority
                               // bit 14: Animation finished
                               // bit 15-16: Background ID
                               // bit 17
                               // bit 18
                               // bit 19-25(?)
                               // bit 26
                               // bit 27-29(?)
                               // bit 30
                               // bit 31
    /* 0x0C */ u16 anim;
    /* 0x0E */ u16 animCursor;
    /* 0x10 */ s16 x;
    /* 0x12 */ s16 y;
    /* 0x14 */ s16 oamFlags; // bit 6-10: OAM order index
    /* 0x16 */ s16 qAnimDelay; // Q_8_8, in frames
    /* 0x18 */ u16 prevAnim;
    /* 0x1A */ u8 variant;
    /* 0x1B */ u8 prevVariant;

    // 0x08 = 0.5x, 0x10 = 1.0x, 0x20 = 2.0x ...
    /* 0x1C */ u8 animSpeed;

    /* 0x1D */ u8 oamBaseIndex;
    /* 0x1E */ u8 numSubFrames;
    /* 0x1F */ u8 palId; // (0 - 15)
    /* 0x20 */ Hitbox hitboxes[1];
} Sprite;
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80720E4
sub_80720E4: @ 0x080720E4
	push {r4, r5, r6, r7, lr}
	mov r7, sl
	mov r6, sb
	mov r5, r8
	push {r5, r6, r7}
	sub sp, #0x10
	ldr r1, _08072128 @ =gCurTask
	ldr r0, [r1]
	ldrh r0, [r0, #6]
	movs r1, #0xc0
	lsls r1, r1, #0x12
	adds r5, r0, r1
	ldr r2, _0807212C @ =0x0300013C
	adds r2, r2, r0
	mov r8, r2
	ldr r4, _08072130 @ =0x03000164
	adds r4, r4, r0
	mov sl, r4
	ldrh r0, [r5, #0x14]
	adds r0, #1
	movs r6, #0
	mov sb, r6
	strh r0, [r5, #0x14]
	ldrh r6, [r5, #0x30]
	cmp r6, #0x14
	bne _0807211A
	b _08072294
_0807211A:
	cmp r6, #0x14
	bgt _08072134
	cmp r6, #0
	beq _08072142
	cmp r6, #0xa
	beq _0807217C
	b _08072424
	.align 2, 0
_08072128: .4byte gCurTask
_0807212C: .4byte 0x0300013C
_08072130: .4byte 0x03000164
_08072134:
	cmp r6, #0x32
	bne _0807213A
	b _0807234C
_0807213A:
	cmp r6, #0x64
	bne _08072140
	b _0807236C
_08072140:
	b _08072424
_08072142:
	movs r1, #0x10
	ldrsh r0, [r5, r1]
	ldr r1, [r5]
	adds r1, r1, r0
	str r1, [r5]
	asrs r1, r1, #8
	ldr r0, _0807215C @ =0x00000514
	cmp r1, r0
	ble _08072160
	movs r0, #0xff
	lsls r0, r0, #8
	b _08072164
	.align 2, 0
_0807215C: .4byte 0x00000514
_08072160:
	movs r0, #0x80
	lsls r0, r0, #1
_08072164:
	strh r0, [r5, #8]
	movs r0, #0xfc
	lsls r0, r0, #8
	strh r0, [r5, #0xa]
	ldr r1, _08072178 @ =gCamera
	ldr r0, [r5, #0x28]
	str r0, [r1, #0x14]
	movs r0, #0xa
	strh r0, [r5, #0x30]
	b _08072424
	.align 2, 0
_08072178: .4byte gCamera
_0807217C:
	ldrh r0, [r5, #0xa]
	adds r0, #0x40
	strh r0, [r5, #0xa]
	lsls r0, r0, #0x10
	asrs r0, r0, #0x10
	movs r1, #0x80
	lsls r1, r1, #3
	cmp r0, r1
	ble _08072190
	strh r1, [r5, #0xa]
_08072190:
	movs r2, #8
	ldrsh r1, [r5, r2]
	ldr r0, [r5]
	adds r2, r0, r1
	str r2, [r5]
	movs r4, #0xa
	ldrsh r1, [r5, r4]
	ldr r0, [r5, #4]
	adds r0, r0, r1
	str r0, [r5, #4]
	movs r6, #8
	ldrsh r0, [r5, r6]
	cmp r0, #0
	beq _080721D0
	cmp r0, #0
	bge _080721C4
	asrs r1, r2, #8
	ldr r0, _080721C0 @ =0x00000514
	cmp r1, r0
	bgt _080721D0
	mov r0, sb
	strh r0, [r5, #8]
	b _080721D0
	.align 2, 0
_080721C0: .4byte 0x00000514
_080721C4:
	asrs r1, r2, #8
	ldr r0, _08072278 @ =0x00000513
	cmp r1, r0
	ble _080721D0
	mov r1, sb
	strh r1, [r5, #8]
_080721D0:
	ldr r0, [r5, #4]
	asrs r0, r0, #8
	ldr r1, _0807227C @ =0x00000596
	cmp r0, r1
	ble _080721F8
	movs r0, #0xfa
	lsls r0, r0, #8
	strh r0, [r5, #0xa]
	movs r0, #0x14
	strh r0, [r5, #0x30]
	movs r0, #0x80
	lsls r0, r0, #4
	movs r3, #1
	rsbs r3, r3, #0
	movs r1, #0x91
	str r1, [sp]
	movs r1, #4
	movs r2, #0
	bl sub_805256C
_080721F8:
	ldrh r1, [r5, #0x14]
	movs r0, #1
	ands r0, r1
	cmp r0, #0
	beq _08072268
	ldr r3, _08072280 @ =gPseudoRandom
	ldr r0, [r3]
	ldr r2, _08072284 @ =0x00196225
	muls r0, r2, r0
	ldr r1, _08072288 @ =0x3C6EF35F
	adds r0, r0, r1
	ldr r7, _0807228C @ =0x000003FF
	ands r7, r0
	muls r0, r2, r0
	adds r0, r0, r1
	str r0, [r3]
	movs r1, #0x30
	bl __umodsi3
	adds r4, r0, #0
	ldr r1, _08072290 @ =gSineTable
	movs r2, #0x80
	lsls r2, r2, #1
	adds r0, r7, r2
	lsls r0, r0, #1
	adds r0, r0, r1
	movs r6, #0
	ldrsh r0, [r0, r6]
	muls r0, r4, r0
	lsrs r2, r0, #6
	lsls r0, r7, #1
	adds r0, r0, r1
	movs r1, #0
	ldrsh r0, [r0, r1]
	muls r0, r4, r0
	lsrs r0, r0, #6
	ldr r1, [r5]
	adds r1, r1, r2
	lsls r1, r1, #8
	asrs r1, r1, #0x10
	ldr r2, [r5, #4]
	adds r2, r2, r0
	lsls r2, r2, #8
	asrs r2, r2, #0x10
	movs r3, #0x80
	lsls r3, r3, #3
	str r7, [sp]
	movs r0, #0x14
	str r0, [sp, #4]
	movs r0, #0x80
	str r0, [sp, #8]
	ldr r0, [r5, #0x1c]
	str r0, [sp, #0xc]
	movs r0, #7
	bl sub_8079758
_08072268:
	ldrh r1, [r5, #0x14]
	movs r0, #0x3f
	ands r0, r1
	cmp r0, #0
	beq _08072274
	b _08072424
_08072274:
	b _08072360
	.align 2, 0
_08072278: .4byte 0x00000513
_0807227C: .4byte 0x00000596
_08072280: .4byte gPseudoRandom
_08072284: .4byte 0x00196225
_08072288: .4byte 0x3C6EF35F
_0807228C: .4byte 0x000003FF
_08072290: .4byte gSineTable
_08072294:
	ldrh r0, [r5, #0xa]
	adds r0, #0x20
	strh r0, [r5, #0xa]
	movs r2, #8
	ldrsh r1, [r5, r2]
	ldr r0, [r5]
	adds r0, r0, r1
	str r0, [r5]
	movs r4, #0xa
	ldrsh r1, [r5, r4]
	ldr r0, [r5, #4]
	adds r0, r0, r1
	str r0, [r5, #4]
	asrs r0, r0, #8
	movs r1, #0xc8
	lsls r1, r1, #3
	cmp r0, r1
	ble _080722C0
	movs r0, #0x3c
	strh r0, [r5, #0x32]
	movs r0, #0x32
	strh r0, [r5, #0x30]
_080722C0:
	ldrh r1, [r5, #0x14]
	movs r0, #1
	ands r0, r1
	cmp r0, #0
	beq _0807232A
	ldr r3, _08072338 @ =gPseudoRandom
	ldr r0, [r3]
	ldr r2, _0807233C @ =0x00196225
	muls r0, r2, r0
	ldr r1, _08072340 @ =0x3C6EF35F
	adds r0, r0, r1
	ldr r7, _08072344 @ =0x000003FF
	ands r7, r0
	muls r0, r2, r0
	adds r0, r0, r1
	str r0, [r3]
	movs r4, #0x1f
	ands r4, r0
	ldr r1, _08072348 @ =gSineTable
	movs r2, #0x80
	lsls r2, r2, #1
	adds r0, r7, r2
	lsls r0, r0, #1
	adds r0, r0, r1
	movs r2, #0
	ldrsh r0, [r0, r2]
	muls r0, r4, r0
	lsrs r2, r0, #6
	lsls r0, r7, #1
	adds r0, r0, r1
	movs r1, #0
	ldrsh r0, [r0, r1]
	muls r0, r4, r0
	lsrs r0, r0, #6
	ldr r1, [r5]
	adds r1, r1, r2
	lsls r1, r1, #8
	asrs r1, r1, #0x10
	ldr r2, [r5, #4]
	adds r2, r2, r0
	lsls r2, r2, #8
	asrs r2, r2, #0x10
	movs r3, #0x80
	lsls r3, r3, #3
	str r7, [sp]
	str r6, [sp, #4]
	movs r0, #0x20
	str r0, [sp, #8]
	ldr r0, [r5, #0x1c]
	str r0, [sp, #0xc]
	movs r0, #7
	bl sub_8079758
_0807232A:
	ldrh r1, [r5, #0x14]
	movs r0, #0x3f
	ands r0, r1
	cmp r0, #0
	bne _08072424
	b _08072360
	.align 2, 0
_08072338: .4byte gPseudoRandom
_0807233C: .4byte 0x00196225
_08072340: .4byte 0x3C6EF35F
_08072344: .4byte 0x000003FF
_08072348: .4byte gSineTable
_0807234C:
	ldrh r0, [r5, #0x32]
	subs r0, #1
	strh r0, [r5, #0x32]
	lsls r0, r0, #0x10
	cmp r0, #0
	bne _08072424
	movs r0, #0xb4
	strh r0, [r5, #0x32]
	movs r0, #0x64
	strh r0, [r5, #0x30]
_08072360:
	ldr r0, _08072368 @ =0x00000221
	bl m4aSongNumStart
	b _08072424
	.align 2, 0
_08072368: .4byte 0x00000221
_0807236C:
	ldrh r1, [r5, #0x32]
	movs r0, #1
	ands r0, r1
	cmp r0, #0
	beq _080723F6
	ldr r4, _080724B8 @ =gPseudoRandom
	ldr r0, [r4]
	ldr r3, _080724BC @ =0x00196225
	adds r1, r0, #0
	muls r1, r3, r1
	ldr r2, _080724C0 @ =0x3C6EF35F
	adds r1, r1, r2
	movs r0, #0xff
	ands r0, r1
	movs r6, #0xa0
	lsls r6, r6, #2
	adds r7, r0, r6
	adds r0, r1, #0
	muls r0, r3, r0
	adds r0, r0, r2
	str r0, [r4]
	movs r1, #0x30
	bl __umodsi3
	adds r4, r0, #0
	movs r0, #3
	adds r3, r4, #0
	ands r3, r0
	lsls r3, r3, #8
	ldr r2, _080724C4 @ =gSineTable
	movs r1, #0x80
	lsls r1, r1, #1
	adds r0, r7, r1
	lsls r0, r0, #1
	adds r0, r0, r2
	movs r6, #0
	ldrsh r0, [r0, r6]
	adds r1, r0, #0
	muls r1, r4, r1
	lsls r0, r7, #1
	adds r0, r0, r2
	movs r2, #0
	ldrsh r0, [r0, r2]
	adds r2, r0, #0
	muls r2, r4, r2
	lsrs r1, r1, #0xe
	ldr r4, _080724C8 @ =0x00000514
	adds r1, r1, r4
	lsls r1, r1, #0x10
	asrs r1, r1, #0x10
	lsrs r2, r2, #0xe
	ldr r6, _080724CC @ =0x00000604
	adds r2, r2, r6
	lsls r2, r2, #0x10
	asrs r2, r2, #0x10
	movs r4, #0x80
	lsls r4, r4, #3
	adds r0, r4, #0
	orrs r3, r0
	str r7, [sp]
	movs r0, #0x14
	str r0, [sp, #4]
	mov r6, sb
	str r6, [sp, #8]
	ldr r0, [r5, #0x1c]
	str r0, [sp, #0xc]
	movs r0, #7
	bl sub_8079758
_080723F6:
	ldrh r1, [r5, #0x32]
	movs r0, #0x3f
	ands r0, r1
	cmp r0, #0
	bne _08072406
	ldr r0, _080724D0 @ =0x00000221
	bl m4aSongNumStart
_08072406:
	ldrh r0, [r5, #0x32]
	subs r0, #1
	strh r0, [r5, #0x32]
	lsls r0, r0, #0x10
	asrs r0, r0, #0x10
	cmp r0, #0
	bne _08072424
	strh r0, [r5, #0x14]
	movs r0, #0xfa
	lsls r0, r0, #2
	strh r0, [r5, #0x30]
	ldr r0, _080724D4 @ =gCurTask
	ldr r1, [r0]
	ldr r0, _080724D8 @ =sub_80724E4
	str r0, [r1, #8]
_08072424:
	ldr r0, [r5]
	asrs r0, r0, #8
	ldr r4, _080724DC @ =gCamera
	ldr r1, [r4]
	subs r0, r0, r1
	mov r1, r8
	strh r0, [r1, #0x10]
	ldr r0, [r5, #4]
	asrs r0, r0, #8
	ldr r1, [r4, #4]
	subs r0, r0, r1
	mov r2, r8
	strh r0, [r2, #0x12]
	ldr r0, [r2, #8]
	movs r1, #0x80
	lsls r1, r1, #3
	orrs r0, r1
	str r0, [r2, #8]
	mov r0, r8
	bl DisplaySprite
	mov r6, r8
	ldr r0, [r6, #8]
	ldr r1, _080724E0 @ =0xFFFFFBFF
	ands r0, r1
	str r0, [r6, #8]
	mov r0, r8
	bl DisplaySprite
	ldrb r0, [r6, #0x1a]
	cmp r0, #0
	bne _08072488
	ldr r0, [r5]
	asrs r0, r0, #8
	ldr r1, [r4]
	subs r0, r0, r1
	mov r1, sl
	strh r0, [r1, #0x10]
	ldr r0, [r5, #4]
	asrs r0, r0, #8
	ldr r1, [r4, #4]
	subs r0, r0, r1
	mov r2, sl
	strh r0, [r2, #0x12]
	mov r0, sl
	bl UpdateSpriteAnimation
	mov r0, sl
	bl DisplaySprite
_08072488:
	movs r4, #0x98
	lsls r4, r4, #1
	adds r0, r5, r4
	ldr r1, [r0]
	ldr r0, [r1, #4]
	movs r2, #0x80
	lsls r2, r2, #0x14
	orrs r0, r2
	str r0, [r1, #4]
	movs r6, #0x9a
	lsls r6, r6, #1
	adds r0, r5, r6
	ldr r1, [r0]
	ldr r0, [r1, #4]
	orrs r0, r2
	str r0, [r1, #4]
	add sp, #0x10
	pop {r3, r4, r5}
	mov r8, r3
	mov sb, r4
	mov sl, r5
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_080724B8: .4byte gPseudoRandom
_080724BC: .4byte 0x00196225
_080724C0: .4byte 0x3C6EF35F
_080724C4: .4byte gSineTable
_080724C8: .4byte 0x00000514
_080724CC: .4byte 0x00000604
_080724D0: .4byte 0x00000221
_080724D4: .4byte gCurTask
_080724D8: .4byte sub_80724E4
_080724DC: .4byte gCamera
_080724E0: .4byte 0xFFFFFBFF
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
