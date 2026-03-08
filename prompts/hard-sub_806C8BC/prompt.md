You are decompiling an assembly function called `sub_806C8BC` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_8020284`

```c
void sub_8020284()
{
    Cheese *cheese = TASK_DATA(gCurTask);
    Player *player = cheese->player;
    Sprite2 *s = &cheese->s;
    s16 screenX, screenY;

    if (player->charFlags.someIndex == 0x5) {
        return;
    }

    screenX = I(cheese->qWorldX) - gCamera.x;
    screenY = I(cheese->qWorldY) - gCamera.y;

    s->x = screenX + cheese->unk10;
    s->y = screenY + cheese->unk12;
    s->oamFlags = player->spriteInfoBody->s.oamFlags + SPRITE_OAM_ORDER(1);

    s->frameFlags &= ~0x3000;
    s->frameFlags |= (player->spriteInfoBody->s.frameFlags & 0x3000);

    if (cheese->unk19 > 0xCU) {
        s->palId = player->spriteInfoBody->s.palId;
        s->frameFlags |= MOVESTATE_40000;
    } else {
        s->palId = 0;
        s->frameFlags &= ~MOVESTATE_40000;
    }

    if (cheese->moveState & 1) {
        SPRITE_FLAG_CLEAR(s, X_FLIP);
    } else {
        SPRITE_FLAG_SET(s, X_FLIP);
    }

    if (cheese->player->moveState & 0x10000) {
        SPRITE_FLAG_SET(s, Y_FLIP);
    } else {
        SPRITE_FLAG_CLEAR(s, Y_FLIP);
    }

    UpdateSpriteAnimation((Sprite *)s);

    if ((cheese->player->callback == sub_800EAEC) || (cheese->player->callback == Player_800EAAC)
        || ((gPlayers[cheese->player->charFlags.partnerIndex].callback == sub_800EAEC))
        || (gPlayers[cheese->player->charFlags.partnerIndex].callback == Player_800EAAC)) {
        cheese->moveState |= 8;
    }
    if (!(cheese->moveState & CMS_INVISIBLE)) {
        DisplaySprite((Sprite *)s);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         ldr r0, [pc, #0x7c] # REFERENCE_.L80
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r1, r0
         ldr r3, [r5, #0x50]
         add r0, #0x20
         add r4, r1, r0
         mov r0, r3
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         mov r0, #0x1c
         and r0, r1
         cmp r0, #0x14
         bne .L2418
         b .L138149
     16ldr r1, [r5, #0x0]
         asr r1, #0x8
         ldr r2, [pc, #0x58] # REFERENCE_.L84
         ldr r0, [r2, #0x0]
         sub r1, r0
         ldr r0, [r5, #0x4]
         asr r0, #0x8
         ldr r2, [r2, #0x4]
         sub r0, r2
         lsl r1, #0x10
         asr r1, #0x10
         ldrh r2, [r5, #0x10]
         add r1, r2
         strh r1, [r4, #0x10]
         lsl r0, #0x10
         asr r0, #0x10
         ldrh r1, [r5, #0x12]
         add r0, r1
         strh r0, [r4, #0x12]
         add r3, #0xe0
         ldr r0, [r3, #0x0]
         ldrh r0, [r0, #0x20]
         add r0, #0x40
         strh r0, [r4, #0x14]
         ldr r1, [r4, #0x8]
         ldr r0, [pc, #0x30] # REFERENCE_.L88
         and r1, r0
         str r1, [r4, #0x8]
         ldr r0, [r3, #0x0]
         ldr r2, [r0, #0x14]
         mov r0, #0xc0
         lsl r0, #0x6
         and r2, r0
         orr r2, r1
         str r2, [r4, #0x8]
         ldrb r0, [r5, #0x19]
         cmp r0, #0xc
         bls .L8c67
         ldr r0, [r3, #0x0]
         add r0, #0x2b
         ldrb r0, [r0, #0x0]
         strb r0, [r4, #0x1f]
         mov r0, #0x80
         lsl r0, #0xb
         orr r2, r0
         b .L9471
         .word gCurTask
         .word gCamera
         .word 0xffffcfff
     55mov r0, #0x0
         strb r0, [r4, #0x1f]
         ldr r0, [pc, #0x14] # REFERENCE_.La8
         and r2, r0
     63str r2, [r4, #0x8]
         ldrh r1, [r5, #0x16]
         mov r0, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .Lb083
         ldr r0, [r4, #0x8]
         ldr r1, [pc, #0x8] # REFERENCE_.Lac
         and r0, r1
         b .Lb887
         .word 0xfffbffff
         .word 0xfffffbff
     76ldr r0, [r4, #0x8]
         mov r1, #0x80
         lsl r1, #0x3
         orr r0, r1
     80str r0, [r4, #0x8]
         ldr r0, [r5, #0x50]
         ldr r0, [r0, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .Ld2100
         ldr r0, [r4, #0x8]
         mov r1, #0x80
         lsl r1, #0x4
         orr r0, r1
         b .Ld8103
     94ldr r0, [r4, #0x8]
         ldr r1, [pc, #0x68] # REFERENCE_.L140
         and r0, r1
     99str r0, [r4, #0x8]
         mov r0, r4
         bl UpdateSpriteAnimation-0x4
         ldr r0, [r5, #0x50]
         ldr r1, [r0, #0x0]
         ldr r3, [pc, #0x5c] # REFERENCE_.L144
         cmp r1, r3
         beq .L120138
         ldr r7, [pc, #0x5c] # REFERENCE_.L148
         cmp r1, r7
         beq .L120138
         ldr r6, [pc, #0x58] # REFERENCE_.L14c
         add r0, #0x2b
         ldrb r0, [r0, #0x0]
         lsl r2, r0, #0x1e
         lsr r1, r2, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r0, r6
         ldr r0, [r0, #0x0]
         cmp r0, r3
         beq .L120138
         mov r0, r1
         lsl r1, r0, #0x2
         add r1, r0
         lsl r1, #0x2
         add r1, r0
         lsl r1, #0x4
         add r1, r6
         ldr r0, [r1, #0x0]
         cmp r0, r7
         bne .L128142
     110ldrh r1, [r5, #0x16]
         mov r0, #0x8
         orr r0, r1
         strh r0, [r5, #0x16]
     137ldrh r1, [r5, #0x16]
         mov r0, #0x8
         and r0, r1
         cmp r0, #0x0
         bne .L138149
         mov r0, r4
         bl DisplaySprite-0x4
     17pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0xfffff7ff
         .word sub_800EAEC
         .word Player_800EAAC
         .word gPlayers
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

## `Task_8099300`

```c
void Task_8099300(u16 arg2) {
    Player *temp_r1_2;
    Sprite *temp_r0_2;
    u16 temp_r1;
    u16 var_r0;
    u16 var_r2;
    u8 temp_r0;
    u8 temp_r2;

    temp_r1 = gCurTask->data;
    temp_r0 = temp_r1->unk7;
    switch (temp_r0) {                              /* irregular */
    case 1:
        if (gStageData.playerIndex == 0) {
            var_r0 = sub_80240B4(temp_r1->unk3);
        } else {
            var_r0 = sub_80240F4();
        }
        var_r2 = var_r0;
        temp_r1->unk9 = (u8) ((0x10 & var_r2) | temp_r1->unk9);
        /* fallthrough */
    default:
        if ((s32) (M2C_ERROR(/* Read from unset register $r2 */) << 0x10) < 0) {
            sub_802613C();
            return;
        }
    case 0:
    case 3:
        sub_809ADF0((CharacterSelect *) temp_r1);
        sub_809AE50((CharacterSelect *) temp_r1);
        sub_809AF08(temp_r1);
        sub_809B69C((CharacterSelect *) temp_r1);
        sub_809B6C0((CharacterSelect *) temp_r1);
        if ((u32) temp_r1->unkB <= 0xCU) {
            gDispCnt |= 0x200;
            if ((u32) temp_r1->unkB <= 0xCU) {
                temp_r1->unkB = 0xCU;
                temp_r1->unk34 = (s32) temp_r1->unk3C;
                temp_r1->unk38 = (s32) temp_r1->unk40;
                temp_r1->unk5 = (u8) temp_r1->unk3;
                sub_809BF3C(temp_r1 + 5, temp_r1 + 0xB, temp_r1 + 0x34, temp_r1 + 0x38, temp_r1->unk20);
                temp_r1->unk4C = 0x12C00;
            }
        }
        temp_r0_2 = temp_r1 + 0x9C;
        temp_r2 = temp_r1->unkB - 0xB;
        temp_r0_2->anim = (*gUnknown_080D8D08)[temp_r2 + (temp_r1->unkA * 8)].anim;
        temp_r0_2->variant = (*gUnknown_080D8D08)[temp_r2 + (temp_r1->unkA * 8)].variant;
        UpdateSpriteAnimation(temp_r0_2);
        switch (gStageData.gameMode) {              /* switch 1; irregular */
        case 0:                                     /* switch 1 */
        case 3:                                     /* switch 1 */
        case 4:                                     /* switch 1 */
            gPlayers->unk2A = (u8) ((-0x10 & gPlayers->unk2A) | (0xF & gUnknown_080D8F18[temp_r1->unk5]));
block_18:
            gCurTask->main = Task_809947C;
            break;
        case 5:                                     /* switch 1 */
            temp_r1_2 = &gPlayers[gStageData.playerIndex];
            temp_r1_2->unk2A = (u8) ((-0x10 & temp_r1_2->unk2A) | (0xF & gUnknown_080D8F18[temp_r1->unk5]));
            goto block_18;
        }
        return;
    }
}
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         ldr r0, [pc, #0x28] # REFERENCE_.L30
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r5, r1, r0
         ldr r0, [pc, #0x20] # REFERENCE_.L34
         ldrb r1, [r0, #0x6]
         ldrb r0, [r5, #0x7]
         cmp r0, #0x0
         beq .L5638
         cmp r0, #0x3
         beq .L5638
         cmp r0, #0x1
         bne .L4a33
         cmp r1, #0x0
         bne .L3825
         ldrb r0, [r5, #0x3]
         bl sub_80240B4-0x4
         b .L3c26
         .hword 0x0
         .word gCurTask
         .word gStageData
     18bl sub_80240F4-0x4
     21lsl r0, #0x10
         lsr r2, r0, #0x10
         mov r0, #0x10
         and r0, r2
         ldrb r1, [r5, #0x9]
         orr r0, r1
         strb r0, [r5, #0x9]
     16lsl r0, r2, #0x10
         cmp r0, #0x0
         bge .L5638
         bl sub_802613C-0x4
         b .L162160
     12mov r0, r5
         bl sub_809ADF0-0x4
         mov r0, r5
         bl sub_809AE50-0x4
         mov r0, r5
         bl sub_809AF08-0x4
         mov r0, r5
         bl sub_809B69C-0x4
         mov r0, r5
         bl sub_809B6C0-0x4
         ldrb r0, [r5, #0xb]
         cmp r0, #0xc
         bhi .Lba82
         ldr r2, [pc, #0x9c] # REFERENCE_.L118
         ldrh r0, [r2, #0x0]
         mov r3, #0x80
         lsl r3, #0x2
         mov r1, r3
         orr r0, r1
         strh r0, [r2, #0x0]
         ldrb r0, [r5, #0xb]
         cmp r0, #0xc
         bhi .Lba82
         mov r0, #0xc
         strb r0, [r5, #0xb]
         ldr r0, [r5, #0x3c]
         str r0, [r5, #0x34]
         ldr r0, [r5, #0x40]
         str r0, [r5, #0x38]
         ldrb r0, [r5, #0x3]
         strb r0, [r5, #0x5]
         add r0, r5, #0x5
         mov r1, r5
         add r1, #0xb
         mov r2, r5
         add r2, #0x34
         mov r3, r5
         add r3, #0x38
         ldr r4, [r5, #0x20]
         str r4, [sp, #0x0]
         bl sub_809BF3C-0x4
         mov r0, #0x96
         lsl r0, #0x9
         str r0, [r5, #0x4c]
     50mov r0, r5
         add r0, #0x9c
         ldrb r2, [r5, #0xb]
         sub r2, #0xb
         lsl r2, #0x18
         lsr r2, #0x18
         ldr r3, [pc, #0x54] # REFERENCE_.L11c
         ldrb r1, [r5, #0xa]
         lsl r1, #0x3
         add r1, r2, r1
         lsl r1, #0x3
         add r1, r3
         ldrh r1, [r1, #0x0]
         strh r1, [r0, #0xc]
         ldrb r1, [r5, #0xa]
         lsl r1, #0x3
         add r2, r1
         lsl r2, #0x3
         add r2, r3
         ldrb r1, [r2, #0x2]
         strb r1, [r0, #0x1a]
         bl UpdateSpriteAnimation-0x4
         ldr r1, [pc, #0x34] # REFERENCE_.L120
         ldrb r0, [r1, #0x3]
         cmp r0, #0x0
         beq .Lf8112
         cmp r0, #0x3
         beq .Lf8112
         cmp r0, #0x4
         bne .L12c133
     107ldr r3, [pc, #0x28] # REFERENCE_.L124
         ldr r1, [pc, #0x2c] # REFERENCE_.L128
         ldrb r0, [r5, #0x5]
         add r0, r1
         ldrb r0, [r0, #0x0]
         add r3, #0x2a
         mov r1, #0xf
         and r1, r0
         ldrb r2, [r3, #0x0]
         mov r0, #0x10
         neg r0, r0
         and r0, r2
         orr r0, r1
         strb r0, [r3, #0x0]
         b .L15a156
         .hword 0x0
         .word gDispCnt
         .word gUnknown_080D8D08
         .word gStageData
         .word gPlayers
         .word gUnknown_080D8F18
     111cmp r0, #0x5
         bne .L162160
         ldr r2, [pc, #0x38] # REFERENCE_.L16c
         ldrb r0, [r1, #0x6]
         lsl r1, r0, #0x2
         add r1, r0
         lsl r1, #0x2
         add r1, r0
         lsl r1, #0x4
         add r1, r2
         ldr r2, [pc, #0x2c] # REFERENCE_.L170
         ldrb r0, [r5, #0x5]
         add r0, r2
         ldrb r0, [r0, #0x0]
         add r1, #0x2a
         mov r2, #0xf
         and r2, r0
         ldrb r3, [r1, #0x0]
         mov r0, #0x10
         neg r0, r0
         and r0, r3
         orr r0, r2
         strb r0, [r1, #0x0]
     126ldr r0, [pc, #0x18] # REFERENCE_.L174
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.L178
         str r0, [r1, #0x8]
     37add sp, #0x4
         pop {r4, r5}
         pop {r0}
         bx r0
         .hword 0x0
         .word gPlayers
         .word gUnknown_080D8F18
         .word gCurTask
         .word Task_809947C
```

## `UpdateAnimations`

```c
static void UpdateAnimations(void)
{
    DeathCrusher *crusher = TASK_DATA(gCurTask);
    Sprite *s = &crusher->s;
    MapEntity *me = crusher->base.me;
    s16 worldX, worldY;
    s16 i;
    u8 j;

    worldX = TO_WORLD_POS(crusher->base.meX, crusher->base.regionX);
    worldY = TO_WORLD_POS(me->y, crusher->base.regionY);

    s->x = I(crusher->qWorldX) - gCamera.x;
    s->y = I(crusher->qWorldY) - gCamera.y;

    if (!sub_802C140(worldX, worldY, s->x, s->y)) {
        for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
            Player *p = GET_SP_PLAYER_V1(i);

            ResolvePlayerSpriteCollision(s, p);
        }

        SET_MAP_ENTITY_NOT_INITIALIZED(me, crusher->base.meX);

        TaskDestroy(gCurTask);
        return;
    } else if (crusher->hasLED != 0) {
        u16 timeAlive;

        if (crusher->timeAlive != 0) {
            if (++crusher->timeAlive >= 320) {
                crusher->timeAlive = 0;
            }
        }

        timeAlive = crusher->timeAlive;
        if (timeAlive == 0) {
            // With LED, off
            s->anim = ANIM_DEATH_CRUSHER;
            s->variant = 0;
        } else if (timeAlive < 174) {
            // With LED, on
            s->anim = ANIM_DEATH_CRUSHER;
            s->variant = 1;
            s->animSpeed = timeAlive / 8u;
        } else if (timeAlive < 180) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 0;
            s->animSpeed = SPRITE_ANIM_SPEED(1.0);
        } else if (timeAlive < 182) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 1;
        } else if (timeAlive < 184) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 2;
        } else if (timeAlive < 304) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 3;
        } else if (timeAlive < 306) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 2;
        } else if (timeAlive < 308) {
            s->anim = ANIM_DEATH_CRUSHER_SPIKED;
            s->variant = 1;
        } else if (timeAlive < 320) {
            // Remove (bounds of) 2nd hitbox
            CPU_FILL(0, &s->hitboxes[1].b, sizeof(s->hitboxes[0].b), 16);
            s->anim = ANIM_DEATH_CRUSHER;
            s->variant = 0;
        }
    }

    UpdateSpriteAnimation(s);

#ifndef NON_MATCHING
    // The loop must be from a macro...
    for (j = 0; j < 2; j++) {
        if (j != 0) {
            SPRITE_FLAG_SET(s, X_FLIP);
            DisplaySprite(s);
        } else {
            SPRITE_FLAG_CLEAR(s, X_FLIP);
            DisplaySprite(s);
        }
    }
#else
    SPRITE_FLAG_SET(s, X_FLIP);
    DisplaySprite(s);

    SPRITE_FLAG_CLEAR(s, X_FLIP);
    DisplaySprite(s);
#endif
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x8
         ldr r0, [pc, #0x70] # REFERENCE_.L7c
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r8, r0
         mov r0, #0xc0
         lsl r0, #0x12
         mov r1, r8
         add r7, r1, r0
         ldr r5, [pc, #0x64] # REFERENCE_.L80
         add r5, r8
         ldr r2, [r7, #0x0]
         mov r9, r2
         ldrb r0, [r7, #0xa]
         lsl r0, #0x3
         ldrh r1, [r7, #0x4]
         lsl r1, #0x8
         add r0, r1
         ldrb r1, [r2, #0x1]
         lsl r1, #0x3
         ldrh r2, [r7, #0x6]
         lsl r2, #0x8
         add r1, r2
         ldr r2, [r7, #0x3c]
         asr r2, #0x8
         ldr r4, [pc, #0x48] # REFERENCE_.L84
         ldr r3, [r4, #0x0]
         sub r2, r3
         strh r2, [r5, #0x10]
         ldr r2, [r7, #0x40]
         asr r2, #0x8
         ldr r3, [r4, #0x4]
         sub r2, r3
         strh r2, [r5, #0x12]
         lsl r0, #0x10
         asr r0, #0x10
         lsl r1, #0x10
         asr r1, #0x10
         mov r3, #0x10
         ldrsh r2, [r5, r3]
         mov r4, #0x12
         ldrsh r3, [r5, r4]
         bl sub_802C140-0x4
         cmp r0, #0x0
         bne .Ld095
         mov r1, #0x0
         ldr r2, [pc, #0x20] # REFERENCE_.L88
     84lsl r0, r1, #0x10
         mov r4, r0
         cmp r4, #0x0
         beq .L8c65
         mov r0, r6
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
         add r6, r0, r2
         mov r0, r5
         mov r1, r6
         str r2, [sp, #0x4]
         bl ResolvePlayerSpriteCollision-0x4
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r4, r1
         lsr r1, r0, #0x10
         asr r0, #0x10
         ldr r2, [sp, #0x4]
         cmp r0, #0x1
         ble .L6851
         ldrb r0, [r7, #0xa]
         mov r2, r9
         strb r0, [r2, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.Lcc
         ldr r0, [r0, #0x0]
         bl TaskDestroy-0x4
         b .L1fc226
         .hword 0x0
         .word gStageData
         .word gCurTask
     48ldr r0, [pc, #0x38] # REFERENCE_.L10c
         add r0, r8
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         beq .L1b8198
         ldr r2, [pc, #0x34] # REFERENCE_.L110
         add r2, r8
         ldrh r0, [r2, #0x0]
         cmp r0, #0x0
         beq .Lf4113
         add r0, #0x1
         strh r0, [r2, #0x0]
         lsl r0, #0x10
         ldr r1, [pc, #0x28] # REFERENCE_.L114
         cmp r0, r1
         bls .Lf4113
         mov r0, #0x0
         strh r0, [r2, #0x0]
     104mov r0, r7
         add r0, #0x4a
         ldrh r1, [r0, #0x0]
         mov r2, r1
         cmp r1, #0x0
         bne .L11c129
         mov r1, #0x0
         ldr r0, [pc, #0x14] # REFERENCE_.L118
         strh r0, [r5, #0xc]
         strb r1, [r5, #0x1a]
         b .L1b8198
         .hword 0x0
         .word 0x300004c
         .word 0x300004a
         .word 0x13f0000
         .word 0x389
     118cmp r1, #0xad
         bhi .L134140
         ldr r0, [pc, #0xc] # REFERENCE_.L130
         strh r0, [r5, #0xc]
         mov r0, #0x1
         strb r0, [r5, #0x1a]
         lsr r0, r1, #0x3
         strb r0, [r5, #0x1c]
         b .L1b8198
         .hword 0x0
         .word 0x389
     130cmp r1, #0xb3
         bhi .L14c151
         mov r0, #0x0
         ldr r1, [pc, #0xc] # REFERENCE_.L148
         strh r1, [r5, #0xc]
         strb r0, [r5, #0x1a]
         mov r0, #0x10
         strb r0, [r5, #0x1c]
         b .L1b8198
         .hword 0x0
         .word 0x387
     141cmp r1, #0xb5
         bls .L18a178
         cmp r1, #0xb7
         bls .L172168
         ldr r0, [pc, #0xc] # REFERENCE_.L164
         cmp r1, r0
         bhi .L16c165
         ldr r0, [pc, #0xc] # REFERENCE_.L168
         strh r0, [r5, #0xc]
         mov r0, #0x3
         strb r0, [r5, #0x1a]
         b .L1b8198
         .word 0x12f
         .word 0x387
     157ldr r0, [pc, #0xc] # REFERENCE_.L17c
         cmp r1, r0
         bhi .L184175
     154ldr r0, [pc, #0xc] # REFERENCE_.L180
         strh r0, [r5, #0xc]
         mov r0, #0x2
         strb r0, [r5, #0x1a]
         b .L1b8198
         .word 0x131
         .word 0x387
     167ldr r0, [pc, #0xc] # REFERENCE_.L194
         cmp r1, r0
         bhi .L19c185
     152ldr r0, [pc, #0xc] # REFERENCE_.L198
         strh r0, [r5, #0xc]
         mov r0, #0x1
         strb r0, [r5, #0x1a]
         b .L1b8198
         .word 0x133
         .word 0x387
     177ldr r0, [pc, #0x38] # REFERENCE_.L1d8
         cmp r2, r0
         bhi .L1b8198
         mov r0, sp
         mov r4, #0x0
         strh r4, [r0, #0x0]
         mov r1, r5
         add r1, #0x2c
         ldr r2, [pc, #0x2c] # REFERENCE_.L1dc
         bl CpuSet-0x4
         ldr r0, [pc, #0x2c] # REFERENCE_.L1e0
         strh r0, [r5, #0xc]
         strb r4, [r5, #0x1a]
     99mov r0, r5
         bl UpdateSpriteAnimation-0x4
         mov r4, #0x0
     225cmp r4, #0x0
         beq .L1e4215
         ldr r0, [r5, #0x8]
         mov r1, #0x80
         lsl r1, #0x3
         orr r0, r1
         str r0, [r5, #0x8]
         mov r0, r5
         bl DisplaySprite-0x4
         b .L1f2221
         .hword 0x0
         .word 0x13f
         .word 0x1000002
         .word 0x389
     202ldr r0, [r5, #0x8]
         ldr r1, [pc, #0x24] # REFERENCE_.L20c
         and r0, r1
         str r0, [r5, #0x8]
         mov r0, r5
         bl DisplaySprite-0x4
     210add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
         cmp r4, #0x1
         bls .L1c0201
     91add sp, #0x8
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0xfffffbff
```

## `Task_BonusFlower_803C4A0`

```c
void Task_BonusFlower_803C4A0(void)
{
    s32 res = 0;
    BonusFlower *flower = TASK_DATA(gCurTask);
    s8 r3;
    Sprite *s = &flower->s;
    s32 checkY;

    if (flower->unk34 == 0) {
        SPRITE_FLAG_CLEAR(s, Y_FLIP);

        res = +sub_8052418(I(flower->qUnk2C), flower->unk30, 1, +8, sub_8051F54);
    } else {
        SPRITE_FLAG_SET(s, Y_FLIP);

        res = -sub_8052418(I(flower->qUnk2C), flower->unk30, 1, -8, sub_8051F54);
    }

    if (ABS(res) > 1) {
        flower->qUnk2C += Q(res);
        r3 = 0;
    } else {
        r3 = res;
    }

    s->x = flower->unk30 - gCamera.x;
    s->y = (I(flower->qUnk2C) - gCamera.y) + r3;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);
}
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         ldr r0, [pc, #0x34] # REFERENCE_.L3c
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
         bne .L4832
         ldr r0, [r4, #0x8]
         ldr r1, [pc, #0x20] # REFERENCE_.L40
         and r0, r1
         str r0, [r4, #0x8]
         ldr r0, [r4, #0x2c]
         asr r0, #0x8
         mov r2, #0x30
         ldrsh r1, [r4, r2]
         ldr r2, [pc, #0x14] # REFERENCE_.L44
         str r2, [sp, #0x0]
         mov r2, #0x1
         mov r3, #0x8
         bl sub_8052418-0x4
         b .L6a48
         .hword 0x0
         .word gCurTask
         .word 0xfffff7ff
         .word sub_8051F54
     13ldr r0, [r4, #0x8]
         mov r1, #0x80
         lsl r1, #0x4
         orr r0, r1
         str r0, [r4, #0x8]
         ldr r0, [r4, #0x2c]
         asr r0, #0x8
         mov r2, #0x30
         ldrsh r1, [r4, r2]
         mov r3, #0x8
         neg r3, r3
         ldr r2, [pc, #0x24] # REFERENCE_.L84
         str r2, [sp, #0x0]
         mov r2, #0x1
         bl sub_8052418-0x4
         neg r0, r0
     27mov r1, r0
         cmp r0, #0x0
         bge .L7252
         neg r1, r0
     50cmp r1, #0x1
         ble .L8862
         lsl r1, r0, #0x8
         ldr r0, [r5, #0x2c]
         add r0, r1
         str r0, [r5, #0x2c]
         mov r3, #0x0
         b .L8c64
         .hword 0x0
         .word sub_8051F54
     53lsl r0, #0x18
         lsr r3, r0, #0x18
     59ldr r2, [pc, #0x2c] # REFERENCE_.Lbc
         ldr r1, [r2, #0x0]
         ldrh r0, [r5, #0x30]
         sub r0, r1
         strh r0, [r4, #0x10]
         ldr r1, [r5, #0x2c]
         asr r1, #0x8
         ldr r0, [r2, #0x4]
         sub r1, r0
         lsl r0, r3, #0x18
         asr r0, #0x18
         add r0, r1
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
         .word gCamera
```

# Declarations for the functions called from the target assembly

- `void m4aSongNumStart(u16);`
- `AnimCmdResult UpdateSpriteAnimation(Sprite *);`

# Types definitions used in the declarations

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

```c
typedef enum {
    ACMD_RESULT__ANIM_CHANGED = -1,
    ACMD_RESULT__ENDED = 0,
    ACMD_RESULT__RUNNING = +1,
} AnimCmdResult;
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_806C8BC
sub_806C8BC: @ 0x0806C8BC
	push {r4, r5, lr}
	ldr r0, _0806C944 @ =gCurTask
	ldr r0, [r0]
	ldrh r1, [r0, #6]
	movs r0, #0xc0
	lsls r0, r0, #0x12
	adds r5, r1, r0
	ldr r1, [r5]
	asrs r1, r1, #8
	ldr r2, _0806C948 @ =gCamera
	ldr r0, [r2]
	subs r1, r1, r0
	ldr r0, [r5, #4]
	asrs r0, r0, #8
	ldr r2, [r2, #4]
	subs r0, r0, r2
	lsls r1, r1, #8
	str r1, [r5, #0x48]
	lsls r0, r0, #8
	str r0, [r5, #0x4c]
	movs r1, #0
	ldr r3, _0806C94C @ =gPlayers
	movs r2, #0xb4
	lsls r2, r2, #1
_0806C8EC:
	lsls r0, r1, #2
	adds r0, r0, r1
	lsls r0, r0, #2
	adds r0, r0, r1
	lsls r0, r0, #4
	adds r0, r0, r3
	adds r0, #0x52
	strh r2, [r0]
	adds r0, r1, #1
	lsls r0, r0, #0x18
	lsrs r1, r0, #0x18
	cmp r1, #3
	bls _0806C8EC
	ldrb r0, [r5, #0x18]
	adds r0, #1
	strb r0, [r5, #0x18]
	lsls r0, r0, #0x18
	lsrs r0, r0, #0x18
	cmp r0, #5
	bls _0806C932
	ldrh r0, [r5, #0x2a]
	cmp r0, #1
	bhi _0806C932
	adds r0, #1
	movs r4, #0
	strh r0, [r5, #0x2a]
	adds r0, r5, #0
	adds r0, #0xc4
	adds r1, r5, #0
	adds r1, #0x48
	adds r2, r5, #0
	adds r2, #0x16
	bl sub_80789EC
	strb r4, [r5, #0x18]
_0806C932:
	ldrb r0, [r5, #0x16]
	cmp r0, #1
	bhi _0806C950
	adds r0, r5, #0
	adds r0, #0xc4
	bl UpdateSpriteAnimation
	b _0806C95E
	.align 2, 0
_0806C944: .4byte gCurTask
_0806C948: .4byte gCamera
_0806C94C: .4byte gPlayers
_0806C950:
	ldr r0, _0806C964 @ =0x00000221
	bl m4aSongNumStart
	ldr r0, _0806C968 @ =gCurTask
	ldr r1, [r0]
	ldr r0, _0806C96C @ =sub_806C970
	str r0, [r1, #8]
_0806C95E:
	pop {r4, r5}
	pop {r0}
	bx r0
	.align 2, 0
_0806C964: .4byte 0x00000221
_0806C968: .4byte gCurTask
_0806C96C: .4byte sub_806C970
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
