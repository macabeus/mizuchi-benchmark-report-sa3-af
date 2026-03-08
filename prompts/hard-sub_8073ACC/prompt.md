You are decompiling an assembly function called `sub_8073ACC` in ARMv4T from a Game Boy Advance game.

# Examples

## `Task_8005068`

```c
void Task_8005068(void)
{
    PlayerUnkC4 *temp_r1 = TASK_DATA(gCurTask);
    Player *p = &gPlayers[temp_r1->playerId];

    if (p->charFlags.someIndex != 5) {
        sub_801320C(p, p->spriteInfoBody);
        sub_80136DC(temp_r1->playerId);
        if (gStageData.gameMode != GAME_MODE_MP_SINGLE_PACK) {
            sub_8013A68(temp_r1->playerId);
        }
        sub_8014670(p);
        if (gStageData.gameMode != GAME_MODE_MP_SINGLE_PACK) {
            sub_8017618(p);
        }
    }
}
```

```asm
         push {r4, r5, r6, lr}
         ldr r0, [pc, #0x68] # REFERENCE_.L6c
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r1, r0
         mov r0, #0x4
         ldrsh r1, [r5, r0]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x50] # REFERENCE_.L70
         add r4, r0, r1
         mov r0, r4
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         mov r0, #0x1c
         and r0, r1
         cmp r0, #0x14
         beq .L6445
         mov r0, r4
         add r0, #0xe0
         ldr r1, [r0, #0x0]
         mov r0, r4
         bl sub_801320C-0x4
         mov r1, #0x4
         ldrsh r0, [r5, r1]
         bl sub_80136DC-0x4
         ldr r6, [pc, #0x30] # REFERENCE_.L74
         ldrb r0, [r6, #0x3]
         cmp r0, #0x7
         beq .L5238
         mov r1, #0x4
         ldrsh r0, [r5, r1]
         bl sub_8013A68-0x4
     34mov r0, r4
         bl sub_8014670-0x4
         ldrb r0, [r6, #0x3]
         cmp r0, #0x7
         beq .L6445
         mov r0, r4
         bl sub_8017618-0x4
     22pop {r4, r5, r6}
         pop {r0}
         bx r0
         .hword 0x0
         .word gCurTask
         .word gPlayers
         .word gStageData
```

## `sub_802F1B8`

```c
bool16 sub_802F1B8(Sprite *s)
{
    Platform *platform = TASK_DATA(gCurTask);
    PlatformShared *shared = &platform->shared;
    MapEntity *me = platform->shared.base.me;
    s16 i, j;
    s16 k = 0;

    for (i = 0; i < 2; i++) {
        s32 screenX, screenY;

        if (i == 0) {
            screenX = TO_WORLD_POS(shared->base.meX, shared->base.regionX) - gCamera.x;
            screenY = TO_WORLD_POS(me->y, shared->base.regionY) - gCamera.y;
        } else {
            screenX = I(shared->qWorldX) - gCamera.x;
            screenY = I(shared->qWorldY) - gCamera.y;
        }

        if (IS_OUT_OF_CAM_RANGE_TYPED(u32, screenX, screenY)) {
            k++;
        }
    }

    if (k >= 2) {
        for (j = 0; j < NUM_SINGLE_PLAYER_CHARS; j++) {
            Player *p = (j != 0) ? &gPlayers[p->charFlags.partnerIndex] : &gPlayers[gStageData.playerIndex];

            ResolvePlayerSpriteCollision(s, p);
        }

        SET_MAP_ENTITY_NOT_INITIALIZED(me, shared->base.meX);
        TaskDestroy(gCurTask);
        return TRUE;
    } else {
        return FALSE;
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         mov r9, r0
         ldr r0, [pc, #0x3c] # REFERENCE_.L48
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r1, r0
         ldr r0, [r5, #0x0]
         mov r8, r0
         mov r1, #0x0
         mov r12, r1
         ldr r7, [pc, #0x2c] # REFERENCE_.L4c
     73lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         bne .L5038
         ldrb r1, [r5, #0xa]
         lsl r1, #0x3
         ldrh r0, [r5, #0x4]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r7, #0x0]
         sub r3, r1, r0
         mov r0, r8
         ldrb r1, [r0, #0x1]
         lsl r1, #0x3
         ldrh r0, [r5, #0x6]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r7, #0x4]
         sub r2, r1, r0
         b .L6046
         .word gCurTask
         .word gCamera
     19ldr r0, [r5, #0xc]
         asr r0, #0x8
         ldr r1, [r7, #0x0]
         sub r3, r0, r1
         ldr r0, [r5, #0x10]
         asr r0, #0x8
         ldr r1, [r7, #0x4]
         sub r2, r0, r1
     35mov r1, r3
         add r1, #0x80
         mov r0, #0xf8
         lsl r0, #0x1
         cmp r1, r0
         bhi .L7c60
         mov r0, r2
         add r0, #0x80
         cmp r0, #0x0
         blt .L7c60
         mov r0, #0x90
         lsl r0, #0x1
         cmp r2, r0
         ble .L8a67
     51mov r1, r12
         lsl r0, r1, #0x10
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r1
         lsr r0, #0x10
         mov r12, r0
     59mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .L2016
         mov r1, r12
         lsl r0, r1, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .L100121
         mov r1, #0x0
         ldr r7, [pc, #0x14] # REFERENCE_.Lbc
     110lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         beq .Lc093
         mov r0, r6
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .Lc495
         .hword 0x0
         .word gPlayers
     84ldr r0, [pc, #0x34] # REFERENCE_.Lf8
         ldrb r1, [r0, #0x6]
     90lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r6, r0, r7
         mov r0, r9
         mov r1, r6
         bl ResolvePlayerSpriteCollision-0x4
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x1
         ble .La681
         ldrb r0, [r5, #0xa]
         mov r1, r8
         strb r0, [r1, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Lfc
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         mov r0, #0x1
         b .L102122
         .word gStageData
         .word gCurTask
     78mov r0, #0x0
     118pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `Task_8038058`

```c
void Task_8038058(void)
{
    Omochao *omochao;
    Player *p;
    void *data;

    gStageData.unk4 = 4;
    SetSoleBit(gStageData.unkB9, gStageData.playerIndex);
    gStageData.unk85 = 1;

    omochao = TASK_DATA(gCurTask);
    data = omochao->data;

    p = &gPlayers[gStageData.playerIndex];

    gWinRegs[WINREG_WIN1H] = WIN_RANGE(TXTBOX_X, TXTBOX_RIGHT);
    gWinRegs[WINREG_WIN1V] = WIN_RANGE(TXTBOX_Y, TXTBOX_BOTTOM);

    gBldRegs.bldY = 8;

    p->qCamOffsetY = -Q(4);

    if (sub_8038548()) {
        if (sub_8023734(data)) {
            omochao->unk60 = 0x10;
            gCurTask->main = Task_80380FC;
        }

        sub_80239A8(data);
    }
}
```

```asm
         push {r4, r5, r6, lr}
         ldr r2, [pc, #0x7c] # REFERENCE_.L80
         mov r0, #0x4
         strb r0, [r2, #0x4]
         mov r1, #0x1
         mov r0, r1
         ldrb r3, [r2, #0x6]
         lsl r0, r3
         mov r3, r2
         add r3, #0xb9
         strb r0, [r3, #0x0]
         mov r0, r2
         add r0, #0x85
         strb r1, [r0, #0x0]
         ldr r6, [pc, #0x64] # REFERENCE_.L84
         ldr r0, [r6, #0x0]
         ldrh r4, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r0, r4, r0
         ldr r5, [r0, #0x64]
         ldrb r1, [r2, #0x6]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x50] # REFERENCE_.L88
         add r0, r1
         ldr r2, [pc, #0x50] # REFERENCE_.L8c
         ldr r1, [pc, #0x50] # REFERENCE_.L90
         strh r1, [r2, #0x2]
         ldr r1, [pc, #0x50] # REFERENCE_.L94
         strh r1, [r2, #0x6]
         ldr r2, [pc, #0x50] # REFERENCE_.L98
         mov r1, #0x8
         strh r1, [r2, #0x4]
         add r0, #0x9e
         mov r1, #0xfc
         lsl r1, #0x8
         strh r1, [r0, #0x0]
         bl sub_8038548-0x4
         cmp r0, #0x0
         beq .L7857
         mov r0, r5
         bl sub_8023734-0x4
         cmp r0, #0x0
         beq .L7255
         ldr r0, [pc, #0x34] # REFERENCE_.L9c
         add r1, r4, r0
         mov r0, #0x10
         strb r0, [r1, #0x0]
         ldr r1, [r6, #0x0]
         ldr r0, [pc, #0x30] # REFERENCE_.La0
         str r0, [r1, #0x8]
     47mov r0, r5
         bl sub_80239A8-0x4
     43pop {r4, r5, r6}
         pop {r0}
         bx r0
         .hword 0x0
         .word gStageData
         .word gCurTask
         .word gPlayers
         .word gWinRegs
         .word 0x20d0
         .word 0x1858
         .word gBldRegs
         .word 0x3000060
         .word Task_80380FC
```

## `Task_TagActionInit`

```c
void Task_TagActionInit(void)
{
    s16 partnerChar;
    u32 moveState;
    u32 mask;
    Strc_PlayerStrc30 *strc = TASK_DATA(gCurTask);
    Sprite *s = &strc->s;
    Player *p = strc->p;

    moveState = p->moveState;
    mask = MOVESTATE_100;
    mask &= moveState;

    if (mask) {
        AdvanceVariant(p);
        return;
    }

    if (0x4000 & s->frameFlags) {
        Player *partner;
        gCurTask->main = sub_80190C8;
        partner = GET_SP_PLAYER_V1(PLAYER_2);
        partnerChar = partner->charFlags.character;
        if (gStageData.gameMode < 6) {
            s->tiles = OBJ_VRAM0 + 0x4580;
        } else {
            s->tiles = OBJ_VRAM0 + 0x45A0;
        }

        s->frameFlags = 0x1000;
        s->x = 0;
        s->y = 0;
        s->oamFlags = 0x600;
        s->qAnimDelay = 0;
        s->prevAnim = -1;
        s->prevVariant = -1;
        s->animSpeed = 0x10;
        s->palId = 0;
        s->hitboxes[0].index = -1;

        if ((partnerChar == SONIC) || (partnerChar == KNUCKLES) || (partnerChar == AMY)) {
            s->anim = 0x53D;
            s->variant = 0;
        } else {
            s->anim = 0x53D;
            s->variant = 1;
        }
    } else {
        if (p->moveState & 1) {
            s->frameFlags &= ~0x400;
        } else {
            s->frameFlags |= 0x400;
        }

        s->x = I(p->qWorldX) - gCamera.x;
        s->y = I(p->qWorldY) - gCamera.y;
        UpdateSpriteAnimation(s);
        DisplaySprite(s);
    }
}
```

```asm
         push {r4, r5, lr}
         ldr r0, [pc, #0x38] # REFERENCE_.L3c
         ldr r5, [r0, #0x0]
         ldrh r1, [r5, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r3, [r4, #0x28]
         ldr r2, [r3, #0x4]
         mov r0, #0x80
         lsl r0, #0x1
         and r0, r2
         cmp r0, #0x0
         beq .L4432
         mov r2, r3
         add r2, #0xd0
         ldr r0, [r2, #0x0]
         cmp r0, #0x0
         bne .L2820
         b .L12e138
     18ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         mov r1, #0x1
         strb r1, [r0, #0x1a]
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x8] # REFERENCE_.L40
         str r0, [r1, #0x8]
         b .L12e138
         .word gCurTask
         .word sub_8019150
     13ldr r1, [r4, #0x8]
         mov r0, #0x80
         lsl r0, #0x7
         and r0, r1
         cmp r0, #0x0
         beq .Lf0110
         ldr r0, [pc, #0x2c] # REFERENCE_.L80
         str r0, [r5, #0x8]
         mov r0, r3
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x18] # REFERENCE_.L84
         add r0, r1
         add r0, #0x2a
         ldrb r0, [r0, #0x0]
         lsl r0, #0x1c
         lsr r2, r0, #0x1c
         ldr r0, [pc, #0x10] # REFERENCE_.L88
         ldrb r0, [r0, #0x3]
         cmp r0, #0x5
         bhi .L9066
         ldr r0, [pc, #0xc] # REFERENCE_.L8c
         b .L9267
         .word sub_80190C8
         .word gPlayers
         .word gStageData
         .word 0x6014580
     59ldr r0, [pc, #0x40] # REFERENCE_.Ld4
     61str r0, [r4, #0x0]
         mov r0, #0x80
         lsl r0, #0x5
         str r0, [r4, #0x8]
         mov r3, #0x0
         mov r1, #0x0
         strh r1, [r4, #0x10]
         strh r1, [r4, #0x12]
         mov r0, #0xc0
         lsl r0, #0x3
         strh r0, [r4, #0x14]
         strh r1, [r4, #0x16]
         ldr r0, [pc, #0x2c] # REFERENCE_.Ld8
         strh r0, [r4, #0x18]
         mov r0, #0xff
         strb r0, [r4, #0x1b]
         mov r0, #0x10
         strb r0, [r4, #0x1c]
         strb r3, [r4, #0x1f]
         sub r0, #0x11
         str r0, [r4, #0x20]
         mov r0, r2
         cmp r0, #0x0
         beq .Lca95
         cmp r0, #0x3
         beq .Lca95
         cmp r0, #0x4
         bne .Le0103
     90mov r1, #0x0
         ldr r0, [pc, #0xc] # REFERENCE_.Ldc
         strh r0, [r4, #0xc]
         strb r1, [r4, #0x1a]
         b .L12e138
         .word 0x60145a0
         .word 0xffff
         .word 0x53d
     94ldr r0, [pc, #0x8] # REFERENCE_.Lec
         strh r0, [r4, #0xc]
         mov r0, #0x1
         strb r0, [r4, #0x1a]
         b .L12e138
         .hword 0x0
         .word 0x53d
     37mov r0, #0x1
         and r2, r0
         cmp r2, #0x0
         beq .L104119
         ldr r0, [pc, #0x4] # REFERENCE_.L100
         and r1, r0
         b .L10a122
         .hword 0x0
         .word 0xfffffbff
     113mov r0, #0x80
         lsl r0, #0x3
         orr r1, r0
     116str r1, [r4, #0x8]
         ldr r0, [r3, #0x10]
         asr r0, #0x8
         ldr r2, [pc, #0x20] # REFERENCE_.L134
         ldr r1, [r2, #0x0]
         sub r0, r1
         strh r0, [r4, #0x10]
         ldr r0, [r3, #0x14]
         asr r0, #0x8
         ldr r1, [r2, #0x4]
         sub r0, r1
         strh r0, [r4, #0x12]
         mov r0, r4
         bl UpdateSpriteAnimation-0x4
         mov r0, r4
         bl DisplaySprite-0x4
     19pop {r4, r5}
         pop {r0}
         bx r0
         .word gCamera
```

## `Task_804165C`

```c
void Task_804165C(void)
{
    BonusUfo *ufo = TASK_DATA(gCurTask);
    MapEntity *me = ufo->base.me;
    Player *p;
    s32 qWorldX, qWorldY;

    if (ufo->unkB2 == 0) {
        qWorldX = Q(TO_WORLD_POS(ufo->base.meX, ufo->base.regionX));
        qWorldY = Q(TO_WORLD_POS(me->y, ufo->base.regionY));

        p = &gPlayers[gStageData.playerIndex];

        if (p->qWorldX < qWorldX) {
            p->qWorldX += Q(1);
        } else if (p->qWorldX > qWorldX) {
            p->qWorldX -= Q(1);
        }

        if (p->qWorldY > qWorldY) {
            p->qWorldY -= Q(1);
        }

        if (p->qWorldY <= qWorldY) {
            ufo->s3[0].variant++;
            ufo->s3[1].variant++;
            gCurTask->main = Task_8041710;
        }
    } else {
        ufo->unkB2--;
    }

    if (sub_8041988()) {
        sub_8041A48();
    }
}
```

```asm
         push {r4, r5, lr}
         ldr r2, [pc, #0x50] # REFERENCE_.L54
         ldr r0, [r2, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r3, r1, r0
         ldr r4, [r3, #0x0]
         add r0, #0xb2
         add r1, r0
         ldrb r0, [r1, #0x0]
         mov r5, r2
         cmp r0, #0x0
         bne .L9c73
         ldrb r1, [r3, #0xa]
         lsl r1, #0x3
         ldrh r0, [r3, #0x4]
         lsl r0, #0x8
         add r1, r0
         lsl r2, r1, #0x8
         ldrb r1, [r4, #0x1]
         lsl r1, #0x3
         ldrh r0, [r3, #0x6]
         lsl r0, #0x8
         add r1, r0
         lsl r4, r1, #0x8
         ldr r0, [pc, #0x20] # REFERENCE_.L58
         ldrb r1, [r0, #0x6]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x18] # REFERENCE_.L5c
         add r1, r0, r1
         ldr r0, [r1, #0x10]
         cmp r0, r2
         bge .L6045
         mov r2, #0x80
         lsl r2, #0x1
         b .L6648
         .hword 0x0
         .word gCurTask
         .word gStageData
         .word gPlayers
     37cmp r0, r2
         ble .L6a50
         ldr r2, [pc, #0x2c] # REFERENCE_.L94
     40add r0, r2
         str r0, [r1, #0x10]
     46ldr r0, [r1, #0x14]
         cmp r0, r4
         ble .L7a58
         ldr r2, [pc, #0x20] # REFERENCE_.L94
         add r0, r2
         str r0, [r1, #0x14]
         cmp r0, r4
         bgt .La075
     52mov r1, r3
         add r1, #0x76
         ldrb r0, [r1, #0x0]
         add r0, #0x1
         strb r0, [r1, #0x0]
         add r1, #0x28
         ldrb r0, [r1, #0x0]
         add r0, #0x1
         strb r0, [r1, #0x0]
         ldr r1, [r5, #0x0]
         ldr r0, [pc, #0x8] # REFERENCE_.L98
         str r0, [r1, #0x8]
         b .La075
         .word 0xffffff00
         .word Task_8041710
     13sub r0, #0x1
         strb r0, [r1, #0x0]
     57bl sub_8041988-0x4
         lsl r0, #0x10
         cmp r0, #0x0
         beq .Lae80
         bl sub_8041A48-0x4
     78pop {r4, r5}
         pop {r0}
         bx r0
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8073ACC
sub_8073ACC: @ 0x08073ACC
	push {r4, r5, lr}
	ldr r0, _08073B48 @ =gCurTask
	ldr r0, [r0]
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r5, r1, r0
	ldr r0, _08073B4C @ =gStageData
	ldrb r1, [r0, #6]
	lsls r0, r1, #2
	adds r0, r0, r1
	lsls r0, r0, #2
	adds r0, r0, r1
	lsls r0, r0, #4
	ldr r1, _08073B50 @ =gPlayers
	adds r4, r0, r1
	ldr r0, [r4, #0x10]
	asrs r1, r0, #8
	ldr r2, _08073B54 @ =gCamera
	ldr r0, [r2, #0x18]
	adds r0, #0x30
	cmp r1, r0
	ble _08073B02
	ldr r0, [r2, #0x1c]
	subs r0, #0x30
	cmp r1, r0
	blt _08073B0A
_08073B02:
	lsls r0, r0, #8
	str r0, [r4, #0x10]
	movs r0, #0
	strh r0, [r4, #0x18]
_08073B0A:
	adds r0, r5, #0
	bl sub_8074148
	ldr r1, [r4, #0x14]
	movs r0, #0xf0
	lsls r0, r0, #8
	cmp r1, r0
	ble _08073B40
	ldr r1, _08073B54 @ =gCamera
	movs r2, #0xb8
	str r2, [r1, #0x10]
	adds r2, #0xa0
	str r2, [r1, #0x14]
	ldr r0, [r1, #0x18]
	subs r0, #0x10
	str r0, [r1, #0x18]
	ldr r0, [r1, #0x1c]
	adds r0, #0x10
	str r0, [r1, #0x1c]
	str r2, [r5, #0x64]
	movs r0, #0x32
	bl sub_80299D4
	ldr r0, _08073B48 @ =gCurTask
	ldr r1, [r0]
	ldr r0, _08073B58 @ =sub_8073B5C
	str r0, [r1, #8]
_08073B40:
	pop {r4, r5}
	pop {r0}
	bx r0
	.align 2, 0
_08073B48: .4byte gCurTask
_08073B4C: .4byte gStageData
_08073B50: .4byte gPlayers
_08073B54: .4byte gCamera
_08073B58: .4byte sub_8073B5C
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
