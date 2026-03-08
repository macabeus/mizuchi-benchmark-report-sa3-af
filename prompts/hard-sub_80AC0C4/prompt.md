You are decompiling an assembly function called `sub_80AC0C4` in ARMv4T from a Game Boy Advance game.

# Examples

## `Task_80449A4`

```c
void Task_80449A4(void)
{
    PlatformSquare *platform = TASK_DATA(gCurTask);
    MapEntity *me = platform->base.me;
    s16 worldX, worldY;
    u8 r5;

    worldX = I(platform->qWorldX);
    worldY = I(platform->qWorldY);

    r5 = 0;

    if (!sub_8004E20(worldX, worldY - 16, NULL)) {
        platform->qUnk14 += Q(8. / 256.);
    } else {
        platform->qUnk14 -= Q(8. / 256.);
    }

    platform->qWorldY += platform->qUnk14;

    r5 |= sub_8044AA0(platform->ps[0], 0);
    r5 |= sub_8044AA0(platform->ps[1], 1);

    if (!IsWorldPtActive(worldX, worldY)) {
        s16 i;
        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            Player *p = GET_SP_PLAYER_V1(i);
            ResolvePlayerSpriteCollision(&platform->s, p);
        }

        SET_MAP_ENTITY_NOT_INITIALIZED(me, platform->base.unk8);
        TaskDestroy(gCurTask);
        return;
    } else {
        platform->unk16 = r5;
        sub_8044C00(platform);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         ldr r0, [pc, #0x38] # REFERENCE_.L44
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r0, [r4, #0x0]
         mov r9, r0
         ldr r0, [r4, #0xc]
         lsl r0, #0x8
         ldr r1, [r4, #0x10]
         lsl r1, #0x8
         mov r5, #0x0
         lsr r2, r0, #0x10
         mov r8, r2
         asr r0, #0x10
         lsr r7, r1, #0x10
         asr r1, #0x10
         sub r1, #0x10
         lsl r1, #0x10
         asr r1, #0x10
         mov r2, #0x0
         bl sub_8004E20-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L4834
         ldrh r0, [r4, #0x14]
         add r0, #0x8
         b .L4c36
         .word gCurTask
     29ldrh r0, [r4, #0x14]
         sub r0, #0x8
     32strh r0, [r4, #0x14]
         mov r0, #0x14
         ldrsh r1, [r4, r0]
         ldr r0, [r4, #0x10]
         add r0, r1
         str r0, [r4, #0x10]
         ldr r0, [r4, #0x18]
         mov r1, #0x0
         bl .Lf8113
         orr r5, r0
         lsl r0, r5, #0x18
         lsr r5, r0, #0x18
         ldr r0, [r4, #0x1c]
         mov r1, #0x1
         bl .Lf8113
         orr r5, r0
         lsl r0, r5, #0x18
         lsr r5, r0, #0x18
         mov r1, r8
         lsl r0, r1, #0x10
         asr r0, #0x10
         lsl r1, r7, #0x10
         asr r1, #0x10
         bl IsWorldPtActive-0x4
         cmp r0, #0x0
         bne .Le8106
         mov r1, #0x0
         mov r2, #0x20
         add r2, r4
         mov r8, r2
         ldr r7, [pc, #0x14] # REFERENCE_.La4
     95lsl r0, r1, #0x10
         mov r5, r0
         cmp r5, #0x0
         beq .La878
         mov r0, r6
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .Lac80
         .word gPlayers
     70ldr r0, [pc, #0x34] # REFERENCE_.Le0
         ldrb r1, [r0, #0x6]
     76lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r6, r0, r7
         mov r0, r8
         mov r1, r6
         bl ResolvePlayerSpriteCollision-0x4
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r5, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .L9067
         ldrb r0, [r4, #0x8]
         mov r2, r9
         strb r0, [r2, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Le4
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         b .Lf0109
         .hword 0x0
         .word gStageData
         .word gCurTask
     61strb r5, [r4, #0x16]
         mov r0, r4
         bl sub_8044C00-0x4
     102pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
     44pop {r0}
         bx r0
```

## `Task_803D39C`

```c
void Task_803D39C(void)
{
    BonusGameUI *ui = TASK_DATA(gCurTask);
    u8 i;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        Player *p = GET_SP_PLAYER_V1(i);

        p->moveState |= MOVESTATE_IGNORE_INPUT;
    }

    if (ui->unk17 == 1) {
        ui->unk17 = 2;

        if (ui->unk12 == 0) {
            if (UpdateScreenFade(&ui->fade) != SCREEN_FADE_RUNNING) {
                TasksDestroyAll();

                gBackgroundsCopyQueueCursor = gBackgroundsCopyQueueIndex;
                gBgSpritesCount = 0;
                gVramGraphicsCopyCursor = gVramGraphicsCopyQueueIndex;

                WarpToMap((gStageData.zone * 10) + 2, 7);
                return;
            }
        } else {
            ui->unk12--;
        }
    }

    sub_803D614();
    sub_803D784(TRUE);
    sub_803D4C8();
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x20] # REFERENCE_.L24
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         mov r3, #0x0
         ldr r5, [pc, #0x14] # REFERENCE_.L28
     37cmp r3, #0x0
         beq .L2c20
         mov r0, r2
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .L3022
         .hword 0x0
         .word gCurTask
         .word gPlayers
     10ldr r0, [pc, #0x7c] # REFERENCE_.Lac
         ldrb r1, [r0, #0x6]
     16lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r2, r0, r5
         ldr r0, [r2, #0x4]
         mov r1, #0x80
         lsl r1, #0x14
         orr r0, r1
         str r0, [r2, #0x4]
         add r0, r3, #0x1
         lsl r0, #0x18
         lsr r3, r0, #0x18
         cmp r3, #0x1
         bls .L129
         ldrb r0, [r4, #0x17]
         cmp r0, #0x1
         bne .Lcc90
         mov r0, #0x2
         strb r0, [r4, #0x17]
         ldrh r0, [r4, #0x12]
         mov r1, #0x12
         ldrsh r5, [r4, r1]
         cmp r5, #0x0
         bne .Lc888
         mov r1, #0xb2
         lsl r1, #0x3
         add r0, r4, r1
         bl UpdateScreenFade-0x4
         lsl r0, #0x18
         cmp r0, #0x0
         beq .Lcc90
         ldr r1, [pc, #0x38] # REFERENCE_.Lb0
         mov r0, #0x0
         bl TasksDestroyInPriorityRange-0x4
         ldr r1, [pc, #0x34] # REFERENCE_.Lb4
         ldr r0, [pc, #0x38] # REFERENCE_.Lb8
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         ldr r0, [pc, #0x34] # REFERENCE_.Lbc
         strb r5, [r0, #0x0]
         ldr r1, [pc, #0x34] # REFERENCE_.Lc0
         ldr r0, [pc, #0x38] # REFERENCE_.Lc4
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.Lac
         ldrb r1, [r0, #0x9]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x11
         mov r1, #0x80
         lsl r1, #0xa
         add r0, r1
         asr r0, #0x10
         mov r1, #0x7
         bl WarpToMap-0x4
         b .Lda94
         .hword 0x0
         .word gStageData
         .word 0xffff
         .word gBackgroundsCopyQueueCursor
         .word gBackgroundsCopyQueueIndex
         .word gBgSpritesCount
         .word gVramGraphicsCopyCursor
         .word gVramGraphicsCopyQueueIndex
     47sub r0, #0x1
         strh r0, [r4, #0x12]
     40bl sub_803D614-0x4
         mov r0, #0x1
         bl sub_803D784-0x4
         bl sub_803D4C8-0x4
     79pop {r4, r5}
         pop {r0}
         bx r0
```

## `sub_803901C`

```c
void sub_803901C(void)
{
    PlatformCrumbling *platform = TASK_DATA(gCurTask);
    Sprite *s = &platform->s;
    MapEntity *me = platform->base.me;

    s16 worldX, worldY;
    s16 i;
    s16 variant;

    worldX = TO_WORLD_POS(platform->base.meX, platform->base.regionX);
    worldY = TO_WORLD_POS(me->y, platform->base.regionY);
    s->x = I(platform->qWorldX) - gCamera.x;
    s->y = I(platform->qWorldY) - gCamera.y;

    if (!sub_802C140(worldX, worldY, s->x, s->y)) {
        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            Player *p = GET_SP_PLAYER_V1(i);

            ResolvePlayerSpriteCollision(s, p);
        }

        SET_MAP_ENTITY_NOT_INITIALIZED(me, platform->base.meX);
        TaskDestroy(gCurTask);
        return;
    }

    variant = platform->unk42 >> 2;

    if (variant < 4) {
        variant = 0;
    } else {
        variant -= 4;
    }

    if (variant < 12) {
        s->variant = variant;
        UpdateSpriteAnimation(s);
        DisplaySprite(s);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x4
         ldr r0, [pc, #0x70] # REFERENCE_.L7c
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r8, r0
         mov r0, #0xc0
         lsl r0, #0x12
         mov r1, r8
         add r6, r1, r0
         ldr r7, [pc, #0x64] # REFERENCE_.L80
         add r7, r8
         ldr r2, [r6, #0x0]
         mov r9, r2
         ldrb r0, [r6, #0xa]
         lsl r0, #0x3
         ldrh r1, [r6, #0x4]
         lsl r1, #0x8
         add r0, r1
         ldrb r1, [r2, #0x1]
         lsl r1, #0x3
         ldrh r2, [r6, #0x6]
         lsl r2, #0x8
         add r1, r2
         ldr r2, [r6, #0x34]
         asr r2, #0x8
         ldr r4, [pc, #0x48] # REFERENCE_.L84
         ldr r3, [r4, #0x0]
         sub r2, r3
         strh r2, [r7, #0x10]
         ldr r2, [r6, #0x38]
         asr r2, #0x8
         ldr r3, [r4, #0x4]
         sub r2, r3
         strh r2, [r7, #0x12]
         lsl r0, #0x10
         asr r0, #0x10
         lsl r1, #0x10
         asr r1, #0x10
         mov r3, #0x10
         ldrsh r2, [r7, r3]
         mov r4, #0x12
         ldrsh r3, [r7, r4]
         bl sub_802C140-0x4
         cmp r0, #0x0
         bne .Ld095
         mov r1, #0x0
         ldr r2, [pc, #0x20] # REFERENCE_.L88
     84lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         beq .L8c65
         mov r0, r5
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .L9067
         .word gCurTask
         .word 0x300000c
         .word gCamera
         .word gPlayers
     54ldr r0, [pc, #0x38] # REFERENCE_.Lc8
         ldrb r1, [r0, #0x6]
     60lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r5, r0, r2
         mov r0, r7
         mov r1, r5
         str r2, [sp, #0x0]
         bl ResolvePlayerSpriteCollision-0x4
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         ldr r2, [sp, #0x0]
         cmp r0, #0x1
         ble .L6851
         ldrb r0, [r6, #0xa]
         mov r2, r9
         strb r0, [r2, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Lcc
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         b .L100116
         .hword 0x0
         .word gStageData
         .word gCurTask
     48ldr r0, [pc, #0xc] # REFERENCE_.Le0
         add r0, r8
         ldrb r0, [r0, #0x0]
         lsr r0, #0x2
         cmp r0, #0x3
         bgt .Le4104
         mov r1, #0x0
         b .Lea107
         .word 0x3000042
     100sub r0, #0x4
         lsl r0, #0x10
         lsr r1, r0, #0x10
     102lsl r0, r1, #0x10
         asr r0, #0x10
         cmp r0, #0xb
         bgt .L100116
         strb r1, [r7, #0x1a]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
     91add sp, #0x4
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `Task_803D248`

```c
void Task_803D248(void)
{
    BonusGameUI *ui = TASK_DATA(gCurTask);
    u8 i;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        Player *p = GET_SP_PLAYER_V1(i);

        p->moveState |= MOVESTATE_IGNORE_INPUT;
    }

    if (ui->unk17 == 1) {
        ui->unk17 = 2;

        if (ui->unk12 == 0) {
            if (UpdateScreenFade(&ui->fade) != SCREEN_FADE_RUNNING) {
                TasksDestroyAll();

                gBackgroundsCopyQueueCursor = gBackgroundsCopyQueueIndex;
                gBgSpritesCount = 0;
                gVramGraphicsCopyCursor = gVramGraphicsCopyQueueIndex;

                WarpToMap((gStageData.zone * 10) + 2, 7);
                return;
            }
        } else {
            ui->unk12--;
        }
    }

    sub_803D784(TRUE);
    sub_803D4C8();
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x20] # REFERENCE_.L24
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         mov r3, #0x0
         ldr r5, [pc, #0x14] # REFERENCE_.L28
     37cmp r3, #0x0
         beq .L2c20
         mov r0, r2
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .L3022
         .hword 0x0
         .word gCurTask
         .word gPlayers
     10ldr r0, [pc, #0x7c] # REFERENCE_.Lac
         ldrb r1, [r0, #0x6]
     16lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r2, r0, r5
         ldr r0, [r2, #0x4]
         mov r1, #0x80
         lsl r1, #0x14
         orr r0, r1
         str r0, [r2, #0x4]
         add r0, r3, #0x1
         lsl r0, #0x18
         lsr r3, r0, #0x18
         cmp r3, #0x1
         bls .L129
         ldrb r0, [r4, #0x17]
         cmp r0, #0x1
         bne .Lcc90
         mov r0, #0x2
         strb r0, [r4, #0x17]
         ldrh r0, [r4, #0x12]
         mov r1, #0x12
         ldrsh r5, [r4, r1]
         cmp r5, #0x0
         bne .Lc888
         mov r1, #0xb2
         lsl r1, #0x3
         add r0, r4, r1
         bl UpdateScreenFade-0x4
         lsl r0, #0x18
         cmp r0, #0x0
         beq .Lcc90
         ldr r1, [pc, #0x38] # REFERENCE_.Lb0
         mov r0, #0x0
         bl TasksDestroyInPriorityRange-0x4
         ldr r1, [pc, #0x34] # REFERENCE_.Lb4
         ldr r0, [pc, #0x38] # REFERENCE_.Lb8
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         ldr r0, [pc, #0x34] # REFERENCE_.Lbc
         strb r5, [r0, #0x0]
         ldr r1, [pc, #0x34] # REFERENCE_.Lc0
         ldr r0, [pc, #0x38] # REFERENCE_.Lc4
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.Lac
         ldrb r1, [r0, #0x9]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x11
         mov r1, #0x80
         lsl r1, #0xa
         add r0, r1
         asr r0, #0x10
         mov r1, #0x7
         bl WarpToMap-0x4
         b .Ld693
         .hword 0x0
         .word gStageData
         .word 0xffff
         .word gBackgroundsCopyQueueCursor
         .word gBackgroundsCopyQueueIndex
         .word gBgSpritesCount
         .word gVramGraphicsCopyCursor
         .word gVramGraphicsCopyQueueIndex
     47sub r0, #0x1
         strh r0, [r4, #0x12]
     40mov r0, #0x1
         bl sub_803D784-0x4
         bl sub_803D4C8-0x4
     79pop {r4, r5}
         pop {r0}
         bx r0
```

## `Task_BonusFlower_Spawn`

```c
void Task_BonusFlower_Spawn(void)
{
    s32 r3 = 0;
    BonusFlower *flower = TASK_DATA(gCurTask);
    Sprite *s = &flower->s;
    s32 checkY;

    if (flower->unk34 == 0) {
        flower->qUnk28 += Q(0.1875);
        flower->qUnk2C += flower->qUnk28;
        SPRITE_FLAG_CLEAR(s, Y_FLIP);

        checkY = Q(flower->unk32 + 16);
        if (flower->qUnk2C >= checkY) {
            r3 = sub_8052418(I(flower->qUnk2C), flower->unk30, 1, +8, sub_8051F54);
        }
    } else {
        flower->qUnk28 -= Q(0.1875);
        flower->qUnk2C += flower->qUnk28;
        SPRITE_FLAG_SET(s, Y_FLIP);

        checkY = Q(flower->unk32 - 16);
        if (flower->qUnk2C <= checkY) {
            r3 = sub_8052418(I(flower->qUnk2C), flower->unk30, 1, -8, sub_8051F54);
        }
    }

    if (r3 < 0) {
        flower->qUnk2C += Q(r3 + 2);
        flower->qUnk28 = 0;
        s->variant = 1;
        s->prevVariant = -1;
        sub_8003DF0(SE_BONUS_DEFEATED_ENEMY);
        gCurTask->main = Task_BonusFlower_803C4A0;
    }

    s->x = flower->unk30 - gCamera.x;
    s->y = I(flower->qUnk2C) - gCamera.y;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);
}
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         mov r3, #0x0
         ldr r0, [pc, #0x48] # REFERENCE_.L50
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r4, r0, r1
         mov r5, r4
         add r1, #0x34
         add r0, r1
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         bne .L5c43
         ldr r0, [r4, #0x28]
         add r0, #0x30
         str r0, [r4, #0x28]
         ldr r1, [r4, #0x2c]
         add r2, r1, r0
         str r2, [r4, #0x2c]
         ldr r0, [r4, #0x8]
         ldr r1, [pc, #0x24] # REFERENCE_.L54
         and r0, r1
         str r0, [r4, #0x8]
         mov r1, #0x32
         ldrsh r0, [r4, r1]
         add r0, #0x10
         lsl r0, #0x8
         cmp r2, r0
         blt .L9470
         asr r0, r2, #0x8
         mov r2, #0x30
         ldrsh r1, [r4, r2]
         ldr r2, [pc, #0x10] # REFERENCE_.L58
         str r2, [sp, #0x0]
         mov r2, #0x1
         mov r3, #0x8
         b .L8e68
         .hword 0x0
         .word gCurTask
         .word 0xfffff7ff
         .word sub_8051F54
     14ldr r0, [r4, #0x28]
         sub r0, #0x30
         str r0, [r4, #0x28]
         ldr r1, [r4, #0x2c]
         add r2, r1, r0
         str r2, [r4, #0x2c]
         ldr r0, [r4, #0x8]
         mov r1, #0x80
         lsl r1, #0x4
         orr r0, r1
         str r0, [r4, #0x8]
         mov r1, #0x32
         ldrsh r0, [r4, r1]
         sub r0, #0x10
         lsl r0, #0x8
         cmp r2, r0
         bgt .L9470
         asr r0, r2, #0x8
         mov r2, #0x30
         ldrsh r1, [r4, r2]
         mov r3, #0x8
         neg r3, r3
         ldr r2, [pc, #0x5c] # REFERENCE_.Le8
         str r2, [sp, #0x0]
         mov r2, #0x1
     38bl sub_8052418-0x4
         mov r3, r0
     30cmp r3, #0x0
         bge .Lbe90
         add r1, r3, #0x2
         lsl r1, #0x8
         ldr r0, [r5, #0x2c]
         add r0, r1
         str r0, [r5, #0x2c]
         mov r0, #0x0
         str r0, [r5, #0x28]
         mov r0, #0x1
         strb r0, [r4, #0x1a]
         mov r0, #0xff
         strb r0, [r4, #0x1b]
         mov r0, #0x83
         lsl r0, #0x2
         bl sub_8003DF0-0x4
         ldr r0, [pc, #0x34] # REFERENCE_.Lec
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x34] # REFERENCE_.Lf0
         str r0, [r1, #0x8]
     71ldr r2, [pc, #0x34] # REFERENCE_.Lf4
         ldr r1, [r2, #0x0]
         ldrh r0, [r5, #0x30]
         sub r0, r1
         strh r0, [r4, #0x10]
         ldr r0, [r5, #0x2c]
         asr r0, #0x8
         ldr r1, [r2, #0x4]
         sub r0, r1
         strh r0, [r4, #0x12]
         mov r0, r4
         bl UpdateSpriteAnimation-0x4
         mov r0, r4
         bl DisplaySprite-0x4
         add sp, #0x4
         pop {r4, r5}
         pop {r0}
         bx r0
         .hword 0x0
         .word sub_8051F54
         .word gCurTask
         .word Task_BonusFlower_803C4A0
         .word gCamera
```

# Declarations for the functions called from the target assembly

- `void TasksDestroyInPriorityRange(u16, u16);`

# Primary Objective

Decompile the following target assembly function from `asm/code_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80AC0C4
sub_80AC0C4: @ 0x080AC0C4
	push {r4, r5, lr}
	sub sp, #4
	ldr r0, _080AC0F0 @ =gCurTask
	ldr r0, [r0]
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r4, r1, r0
	adds r0, r4, #0
	bl sub_80AC2B4
	ldrb r0, [r4]
	cmp r0, #0
	bne _080AC0F8
	ldr r0, _080AC0F4 @ =gLoadedSaveGame
	ldrh r1, [r0, #0x34]
	movs r0, #0x10
	ands r0, r1
	cmp r0, #0
	bne _080AC104
	b _080AC15C
	.align 2, 0
_080AC0F0: .4byte gCurTask
_080AC0F4: .4byte gLoadedSaveGame
_080AC0F8:
	ldr r0, _080AC13C @ =gLoadedSaveGame
	ldrh r1, [r0, #0x34]
	movs r0, #0x20
	ands r0, r1
	cmp r0, #0
	beq _080AC15C
_080AC104:
	ldr r0, _080AC140 @ =gInput
	ldrh r1, [r0]
	movs r0, #8
	ands r0, r1
	cmp r0, #0
	beq _080AC15C
	ldr r1, _080AC144 @ =0x0000FFFF
	movs r0, #0
	bl TasksDestroyInPriorityRange
	ldr r1, _080AC148 @ =gBackgroundsCopyQueueCursor
	ldr r0, _080AC14C @ =gBackgroundsCopyQueueIndex
	ldrb r0, [r0]
	strb r0, [r1]
	ldr r1, _080AC150 @ =gBgSpritesCount
	movs r0, #0
	strb r0, [r1]
	ldr r1, _080AC154 @ =gVramGraphicsCopyCursor
	ldr r0, _080AC158 @ =gVramGraphicsCopyQueueIndex
	ldrb r0, [r0]
	strb r0, [r1]
	ldrb r0, [r4]
	adds r0, #2
	lsls r0, r0, #0x18
	lsrs r0, r0, #0x18
	bl sub_80AA554
	b _080AC1D8
	.align 2, 0
_080AC13C: .4byte gLoadedSaveGame
_080AC140: .4byte gInput
_080AC144: .4byte 0x0000FFFF
_080AC148: .4byte gBackgroundsCopyQueueCursor
_080AC14C: .4byte gBackgroundsCopyQueueIndex
_080AC150: .4byte gBgSpritesCount
_080AC154: .4byte gVramGraphicsCopyCursor
_080AC158: .4byte gVramGraphicsCopyQueueIndex
_080AC15C:
	ldr r1, [r4, #0xc]
	adds r1, #0x80
	str r1, [r4, #0xc]
	lsrs r1, r1, #8
	subs r1, #0xa
	ldr r2, _080AC1A8 @ =strCredits_CreatedBy
	ldrb r5, [r4, #1]
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	adds r2, r0, r2
	lsls r1, r1, #0x10
	asrs r1, r1, #0x10
	movs r3, #0x24
	ldrsh r0, [r2, r3]
	cmp r1, r0
	blt _080AC1D8
	adds r0, r2, #0
	adds r0, #0x26
	ldrb r0, [r0]
	cmp r0, #2
	bne _080AC1B0
	ldrb r1, [r4, #2]
	ldr r0, _080AC1AC @ =0x0000058C
	adds r2, r4, r0
	adds r3, r4, #0
	adds r3, #8
	adds r0, r4, #0
	adds r0, #0xc
	str r0, [sp]
	adds r0, r5, #0
	bl sub_80ACA80
	ldrb r0, [r4, #2]
	adds r0, #1
	strb r0, [r4, #2]
	b _080AC1C2
	.align 2, 0
_080AC1A8: .4byte strCredits_CreatedBy
_080AC1AC: .4byte 0x0000058C
_080AC1B0:
	adds r1, r4, #0
	adds r1, #0x14
	adds r2, r4, #0
	adds r2, #8
	adds r3, r4, #0
	adds r3, #0xc
	adds r0, r5, #0
	bl sub_80AC9E8
_080AC1C2:
	ldrb r0, [r4, #1]
	adds r0, #1
	strb r0, [r4, #1]
	lsls r0, r0, #0x18
	lsrs r0, r0, #0x18
	cmp r0, #0x7e
	bls _080AC1D8
	ldr r0, _080AC1E0 @ =gCurTask
	ldr r1, [r0]
	ldr r0, _080AC1E4 @ =sub_80AC1E8
	str r0, [r1, #8]
_080AC1D8:
	add sp, #4
	pop {r4, r5}
	pop {r0}
	bx r0
	.align 2, 0
_080AC1E0: .4byte gCurTask
_080AC1E4: .4byte sub_80AC1E8
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
