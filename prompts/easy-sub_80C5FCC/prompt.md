You are decompiling an assembly function called `sub_80C5FCC` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_8020E3C`

```c
bool32 sub_8020E3C(Sprite *s, s32 worldX, s32 worldY, s16 hbIndex, Player *p)
{
    PlayerSpriteInfo *psiBody = p->spriteInfoBody; // r7
    Sprite2 *sprBody = &psiBody->s;
    s32 playerWorldX;
    s32 playerWorldY;

    if (!(p->moveState & 0x100)) {
        if ((s->hitboxes[hbIndex].index != -1) && (sprBody->hitboxes[1].index != -1)) {
            if (HB_COLLISION(worldX, worldY, s->hitboxes[hbIndex].b, I(p->qWorldX), I(p->qWorldY), sprBody->hitboxes[1].b)) {
                return 1U;
            }
        }
    }

    return FALSE;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         mov r7, r0
         mov r5, r1
         mov r10, r2
         ldr r6, [sp, #0x20]
         lsl r3, #0x10
         lsr r3, #0x10
         mov r0, r6
         add r0, #0xe0
         ldr r0, [r0, #0x0]
         mov r12, r0
         mov r0, #0xc
         add r0, r12
         mov r8, r0
         ldr r0, [r6, #0x4]
         mov r1, #0x80
         lsl r1, #0x1
         and r0, r1
         cmp r0, #0x0
         bne .Le4114
         lsl r0, r3, #0x10
         asr r2, r0, #0xd
         mov r1, r7
         add r1, #0x20
         add r1, r2
         ldr r1, [r1, #0x0]
         mov r3, #0x1
         neg r3, r3
         mov r9, r0
         cmp r1, r3
         beq .Le4114
         mov r1, r8
         ldr r0, [r1, #0x28]
         cmp r0, r3
         beq .Le4114
         add r3, r7, r2
         mov r0, r3
         add r0, #0x24
         mov r4, #0x0
         ldrsb r4, [r0, r4]
         add r2, r5, r4
         ldr r0, [r6, #0x10]
         asr r0, #0x8
         mov r1, r12
         add r1, #0x38
         mov r5, #0x0
         ldrsb r5, [r1, r5]
         add r1, r0, r5
         cmp r2, r1
         bgt .L8265
         mov r0, r3
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r4
         add r0, r2, r0
         cmp r0, r1
         bge .L9474
         cmp r2, r1
         blt .Le4114
     53mov r0, r12
         add r0, #0x3a
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r5
         add r0, r1, r0
         cmp r0, r2
         blt .Le4114
     62mov r1, r9
         asr r0, r1, #0xd
         add r3, r7, r0
         mov r0, r3
         add r0, #0x25
         mov r4, #0x0
         ldrsb r4, [r0, r4]
         mov r0, r10
         add r2, r0, r4
         ldr r0, [r6, #0x14]
         asr r0, #0x8
         mov r1, #0x2d
         add r1, r8
         mov r5, #0x0
         ldrsb r5, [r1, r5]
         add r1, r0, r5
         cmp r2, r1
         bgt .Lce103
         mov r0, r3
         add r0, #0x27
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r4
         add r0, r2, r0
         cmp r0, r1
         bge .Le0112
         cmp r2, r1
         blt .Le4114
     91mov r0, r8
         add r0, #0x2f
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r5
         add r0, r1, r0
         cmp r0, r2
         blt .Le4114
     100mov r0, #0x1
         b .Le6115
     23mov r0, #0x0
     113pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `sub_8020700`

```c
bool32 sub_8020700(Sprite *s, s32 worldX, s32 worldY, s16 hbIndex, Player *p, s16 p5)
{
    u8 sp00[4];
    PlayerSpriteInfo *temp_r3;
    Sprite2 *sprPlayer;
    s32 playerWorldX, playerWorldY;

    temp_r3 = p->spriteInfoBody;
    sprPlayer = &temp_r3->s;
    if (p->moveState & 0x100) {
        return 0U;
    }

    if (s->hitboxes[hbIndex].index == -1) {
        return 0U;
    }

    if (temp_r3->s.hitboxes[p5].index == -1) {
        return 0U;
    }

    if (p5 == 0) {
        sp00[0] = -p->spriteOffsetX;
        sp00[1] = -p->spriteOffsetY;
        sp00[2] = +p->spriteOffsetX;
        sp00[3] = +p->spriteOffsetY;
    } else {
        sp00[0] = sprPlayer->hitboxes[p5].b.left;
        sp00[1] = sprPlayer->hitboxes[p5].b.top;
        sp00[2] = sprPlayer->hitboxes[p5].b.right;
        sp00[3] = sprPlayer->hitboxes[p5].b.bottom;
    }

    playerWorldX = I(p->qWorldX);
    playerWorldY = I(p->qWorldY);
    if (p->charFlags.anim0 == 92 || p->charFlags.anim0 == 93) {
        if (p->moveState & 0x10000) {
            playerWorldY -= 32;
        } else {
            playerWorldY += 32;
        }
    }

    if (HB_COLLISION(worldX, worldY, s->hitboxes[hbIndex].b, playerWorldX, playerWorldY,
                     ((Rect8) { sp00[0], sp00[1], sp00[2], sp00[3] }))) {
        return TRUE;
    }

    return FALSE;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x4
         mov r7, r0
         mov r9, r1
         mov r10, r2
         ldr r0, [sp, #0x24]
         mov r12, r0
         ldr r0, [sp, #0x28]
         lsl r3, #0x10
         lsr r2, r3, #0x10
         lsl r0, #0x10
         lsr r5, r0, #0x10
         mov r0, r12
         add r0, #0xe0
         ldr r3, [r0, #0x0]
         mov r6, r3
         add r6, #0xc
         mov r1, r12
         ldr r0, [r1, #0x4]
         mov r1, #0x80
         lsl r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L3a29
         b .L160176
     27lsl r2, #0x10
         asr r1, r2, #0xd
         mov r0, r7
         add r0, #0x20
         add r0, r1
         ldr r0, [r0, #0x0]
         mov r4, #0x1
         neg r4, r4
         mov r8, r2
         cmp r0, r4
         bne .L5241
         b .L160176
     39lsl r0, r5, #0x10
         asr r1, r0, #0x10
         lsl r2, r1, #0x3
         mov r0, r3
         add r0, #0x2c
         add r0, r2
         ldr r0, [r0, #0x0]
         cmp r0, r4
         bne .L6651
         b .L160176
     49cmp r1, #0x0
         bne .L8868
         mov r1, sp
         mov r0, r12
         add r0, #0x24
         ldrb r3, [r0, #0x0]
         neg r0, r3
         strb r0, [r1, #0x0]
         mov r0, r12
         add r0, #0x25
         ldrb r2, [r0, #0x0]
         neg r0, r2
         strb r0, [r1, #0x1]
         mov r0, sp
         strb r3, [r0, #0x2]
         strb r2, [r0, #0x3]
         b .Lac86
     52mov r1, sp
         add r2, r6, r2
         mov r0, r2
         add r0, #0x24
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         mov r0, r2
         add r0, #0x25
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x1]
         mov r0, r2
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x2]
         mov r0, r2
         add r0, #0x27
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x3]
     67mov r1, r12
         ldr r0, [r1, #0x10]
         asr r2, r0, #0x8
         ldr r0, [r1, #0x14]
         asr r5, r0, #0x8
         ldrh r0, [r1, #0x30]
         sub r0, #0x5c
         lsl r0, #0x10
         lsr r0, #0x10
         cmp r0, #0x1
         bhi .Ld4106
         ldr r0, [r1, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .Ld2105
         sub r5, #0x20
         b .Ld4106
     102add r5, #0x20
     96mov r1, r8
         asr r0, r1, #0xd
         add r3, r7, r0
         mov r0, r3
         add r0, #0x24
         mov r4, #0x0
         ldrsb r4, [r0, r4]
         mov r0, r9
         add r1, r0, r4
         mov r0, sp
         mov r6, #0x0
         ldrsb r6, [r0, r6]
         add r2, r6
         cmp r1, r2
         bgt .L108132
         mov r0, r3
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r4
         add r0, r1, r0
         cmp r0, r2
         bge .L118140
         cmp r1, r2
         blt .L160176
     120mov r0, sp
         ldrb r0, [r0, #0x2]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r6
         add r0, r2, r0
         cmp r0, r1
         blt .L160176
     129mov r1, r8
         asr r0, r1, #0xd
         add r3, r7, r0
         mov r0, r3
         add r0, #0x25
         mov r4, #0x0
         ldrsb r4, [r0, r4]
         mov r0, r10
         add r2, r0, r4
         mov r0, sp
         mov r6, #0x1
         ldrsb r6, [r0, r6]
         add r1, r5, r6
         cmp r2, r1
         bgt .L14c166
         mov r0, r3
         add r0, #0x27
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r4
         add r0, r2, r0
         cmp r0, r1
         bge .L15c174
         cmp r2, r1
         blt .L160176
     154mov r0, sp
         ldrb r0, [r0, #0x3]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r6
         add r0, r1, r0
         cmp r0, r2
         blt .L160176
     163mov r0, #0x1
         b .L162177
     28mov r0, #0x0
     175add sp, #0x4
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `sub_8020CE0`

```c
bool32 sub_8020CE0(Sprite *s, s32 worldX, s32 worldY, s16 hbIndex, Player *p)
{
    PlayerSpriteInfo *psiBody = p->spriteInfoBody; // r7
    Sprite2 *sprBody = &psiBody->s;
    s8 sp00[4] = { -p->spriteOffsetX, -p->spriteOffsetY, +p->spriteOffsetX, +p->spriteOffsetY };
    s16 playerWorldX;
    s16 playerWorldY;

    if (sub_802C080(p) == 0) {
        if ((s->hitboxes[hbIndex].index != -1) && (sprBody->hitboxes[0].index != -1)) {
            playerWorldX = I(p->qWorldX);
            playerWorldY = I(p->qWorldY);
            if (p->charFlags.anim0 == 0x5C || p->charFlags.anim0 == 0x5D) {
                if (p->moveState & 0x10000) {
                    playerWorldY -= 32;
                } else {
                    playerWorldY += 32;
                }
            }

            if (HB_COLLISION(worldX, worldY, s->hitboxes[hbIndex].b, playerWorldX, playerWorldY,
                             ((Rect8) { sp00[0], sp00[1], sp00[2], sp00[3] }))) {
                Player_8014550(p);
                return 1U;
            }
        }
    }

    return FALSE;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x8
         mov r8, r0
         mov r9, r1
         mov r10, r2
         ldr r6, [sp, #0x28]
         lsl r3, #0x10
         lsr r5, r3, #0x10
         mov r0, r6
         add r0, #0xe0
         ldr r0, [r0, #0x0]
         mov r7, r0
         add r7, #0xc
         mov r0, r6
         add r0, #0x24
         ldrb r4, [r0, #0x0]
         neg r0, r4
         add r1, sp, #0x4
         strb r0, [r1, #0x0]
         mov r0, r6
         add r0, #0x25
         ldrb r3, [r0, #0x0]
         neg r2, r3
         mov r0, sp
         add r0, #0x5
         strb r2, [r0, #0x0]
         add r0, #0x1
         strb r4, [r0, #0x0]
         add r0, #0x1
         strb r3, [r0, #0x0]
         mov r0, sp
         mov r2, #0x4
         bl memcpy-0x4
         mov r0, r6
         bl sub_802C080-0x4
         cmp r0, #0x0
         bne .L148160
         lsl r2, r5, #0x10
         asr r1, r2, #0xd
         mov r0, r8
         add r0, #0x20
         add r0, r1
         ldr r0, [r0, #0x0]
         mov r1, #0x1
         neg r1, r1
         mov r12, r2
         cmp r0, r1
         beq .L148160
         ldr r0, [r7, #0x20]
         cmp r0, r1
         beq .L148160
         ldr r0, [r6, #0x10]
         lsl r0, #0x8
         lsr r7, r0, #0x10
         ldr r0, [r6, #0x14]
         lsl r0, #0x8
         lsr r5, r0, #0x10
         ldrh r0, [r6, #0x30]
         sub r0, #0x5c
         lsl r0, #0x10
         lsr r0, #0x10
         cmp r0, #0x1
         bhi .Laa82
         ldr r0, [r6, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .La077
         lsl r0, r5, #0x10
         ldr r1, [pc, #0x0] # REFERENCE_.L9c
         b .La680
         .word 0xffe00000
     72lsl r0, r5, #0x10
         mov r1, #0x80
         lsl r1, #0xe
     75add r0, r1
         lsr r5, r0, #0x10
     66mov r1, r12
         asr r0, r1, #0xd
         mov r1, r8
         add r2, r1, r0
         mov r0, r2
         add r0, #0x24
         mov r3, #0x0
         ldrsb r3, [r0, r3]
         mov r0, r9
         add r4, r0, r3
         lsl r0, r7, #0x10
         asr r0, #0x10
         mov r1, sp
         mov r7, #0x0
         ldrsb r7, [r1, r7]
         add r1, r0, r7
         cmp r4, r1
         bgt .Le4111
         mov r0, r2
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r3
         add r0, r4, r0
         cmp r0, r1
         bge .Lf4119
         cmp r4, r1
         blt .L148160
     99mov r0, sp
         ldrb r0, [r0, #0x2]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r7
         add r0, r1, r0
         cmp r0, r4
         blt .L148160
     108mov r1, r12
         asr r0, r1, #0xd
         mov r1, r8
         add r3, r1, r0
         mov r0, r3
         add r0, #0x25
         mov r4, #0x0
         ldrsb r4, [r0, r4]
         mov r0, r10
         add r2, r0, r4
         lsl r0, r5, #0x10
         asr r0, #0x10
         mov r1, sp
         mov r5, #0x1
         ldrsb r5, [r1, r5]
         add r1, r0, r5
         cmp r2, r1
         bgt .L12e148
         mov r0, r3
         add r0, #0x27
         ldrb r0, [r0, #0x0]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r4
         add r0, r2, r0
         cmp r0, r1
         bge .L13e156
         cmp r2, r1
         blt .L148160
     136mov r0, sp
         ldrb r0, [r0, #0x3]
         lsl r0, #0x18
         asr r0, #0x18
         sub r0, r5
         add r0, r1, r0
         cmp r0, r2
         blt .L148160
     145mov r0, r6
         bl Player_8014550-0x4
         mov r0, #0x1
         b .L14a161
     40mov r0, #0x0
     159add sp, #0x8
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `sub_8020874`

```c
u32 sub_8020874(Sprite *s, s32 worldX, s32 worldY, s16 p3, Player *p, s16 p5, u8 p6)
{
    u8 spC[4];
    Sprite2 *temp_r6 = &p->spriteInfoBody->s;

    if ((p->moveState & 0x100) || (s->hitboxes[p3].index == -1) || (p->spriteInfoBody->s.hitboxes[p5].index == -1)) {
        return 0U;
    }

    if (p5 == 0) {
        spC[0] = -p->spriteOffsetX;
        spC[1] = -p->spriteOffsetY;
        spC[2] = +p->spriteOffsetX;
        spC[3] = +p->spriteOffsetY;
    } else {
        spC[0] = temp_r6->hitboxes[p5].b.left;
        spC[1] = temp_r6->hitboxes[p5].b.top;
        spC[2] = temp_r6->hitboxes[p5].b.right;
        spC[3] = temp_r6->hitboxes[p5].b.bottom;
    }

    return sub_8020A58(s, p3, worldX, worldY, (Rect8 *)&spC, p, p6);
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x14
         mov r8, r0
         mov r10, r1
         str r2, [sp, #0x10]
         ldr r0, [sp, #0x34]
         mov r12, r0
         ldr r0, [sp, #0x38]
         ldr r1, [sp, #0x3c]
         lsl r3, #0x10
         lsr r2, r3, #0x10
         lsl r0, #0x10
         lsr r5, r0, #0x10
         lsl r1, #0x18
         lsr r1, #0x18
         mov r9, r1
         mov r0, r12
         add r0, #0xe0
         ldr r3, [r0, #0x0]
         mov r6, r3
         add r6, #0xc
         mov r1, r12
         ldr r0, [r1, #0x4]
         mov r1, #0x80
         lsl r1, #0x1
         and r0, r1
         cmp r0, #0x0
         bne .L6852
         lsl r2, #0x10
         asr r1, r2, #0xd
         mov r0, r8
         add r0, #0x20
         add r0, r1
         ldr r0, [r0, #0x0]
         mov r4, #0x1
         neg r4, r4
         mov r7, r2
         cmp r0, r4
         beq .L6852
         lsl r0, r5, #0x10
         asr r1, r0, #0x10
         lsl r2, r1, #0x3
         mov r0, r3
         add r0, #0x2c
         add r0, r2
         ldr r0, [r0, #0x0]
         cmp r0, r4
         bne .L6c54
     31mov r0, #0x0
         b .Lca100
     51cmp r1, #0x0
         bne .L8e71
         add r1, sp, #0xc
         mov r0, r12
         add r0, #0x24
         ldrb r3, [r0, #0x0]
         neg r0, r3
         strb r0, [r1, #0x0]
         mov r0, r12
         add r0, #0x25
         ldrb r2, [r0, #0x0]
         neg r0, r2
         strb r0, [r1, #0x1]
         mov r0, r1
         strb r3, [r0, #0x2]
         strb r2, [r0, #0x3]
         b .Lb289
     55add r1, sp, #0xc
         add r2, r6, r2
         mov r0, r2
         add r0, #0x24
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x0]
         mov r0, r2
         add r0, #0x25
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x1]
         mov r0, r2
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x2]
         mov r0, r2
         add r0, #0x27
         ldrb r0, [r0, #0x0]
         strb r0, [r1, #0x3]
     70asr r1, r7, #0x10
         add r0, sp, #0xc
         str r0, [sp, #0x0]
         mov r0, r12
         str r0, [sp, #0x4]
         mov r0, r9
         str r0, [sp, #0x8]
         mov r0, r8
         mov r2, r10
         ldr r3, [sp, #0x10]
         bl sub_8020A58-0x4
     53add sp, #0x14
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
```

## `sub_8014FA4`

```c
void sub_8014FA4(Player *p)
{
    u8 sp00[2];
    s32 temp_r0;
    s32 temp_r2;
    s32 var_r0;
    s32 var_r2;
    struct _anonymous *temp_r4;
    u8 temp_r7;
    u8 *temp_r0_2;
    u8 *temp_r6;
    s32 qSpeedGround;
    s32 qSpeedX;
    s32 qSpeedY;

    var_r2 = 0x40;
    if (!(p->moveState & 1)) {
        var_r2 = 0xC0;
    }
    temp_r7 = p->unk26 + var_r2;
    sp00[0] = p->charFlags.unk28;
    sp00[1] = p->charFlags.unk29;
    temp_r2 = Q(sub_8011BFC(temp_r7, p));
    p->charFlags.unk28 = sp00[0];
    p->charFlags.unk29 = sp00[1];
    if (temp_r2 <= 0) {
        temp_r0 = (s32)((temp_r7 + 0x20) & 0xC0) >> 6;
        switch (temp_r0) {
            case 0:
                p->qWorldY += temp_r2;
                qSpeedY = p->qSpeedAirY;
                p->qSpeedAirY = -qSpeedY;
                break;
            case 1:
                p->qWorldX -= temp_r2;
                qSpeedX = p->qSpeedAirX;
                p->qSpeedAirX = -qSpeedX;
                break;
            case 2:
                p->qWorldY -= temp_r2;
                qSpeedY = p->qSpeedAirY;
                p->qSpeedAirY = -qSpeedY;
                qSpeedX = p->qSpeedAirX;
                p->qSpeedAirX = -qSpeedX;
                break;
            case 3:
                p->qWorldX += temp_r2;
                qSpeedX = p->qSpeedAirX;
                p->qSpeedAirX = -qSpeedX;
                break;
        }
        qSpeedGround = p->qSpeedGround;
        p->qSpeedGround = -qSpeedGround;
        p->unk99 = 0;
        p->unk9A = 0;
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         sub sp, #0x4
         mov r5, r0
         mov r2, #0x40
         ldr r0, [r5, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         bne .L1410
         mov r2, #0xc0
     8mov r0, r5
         add r0, #0x26
         ldrb r0, [r0, #0x0]
         add r0, r2
         lsl r0, #0x18
         lsr r7, r0, #0x18
         mov r1, sp
         mov r4, r5
         add r4, #0x28
         ldrb r0, [r4, #0x0]
         strb r0, [r1, #0x0]
         mov r6, r5
         add r6, #0x29
         ldrb r0, [r6, #0x0]
         strb r0, [r1, #0x1]
         mov r0, r7
         mov r1, r5
         bl sub_8011BFC-0x4
         lsl r2, r0, #0x8
         mov r0, sp
         ldrb r0, [r0, #0x0]
         strb r0, [r4, #0x0]
         mov r0, sp
         ldrb r0, [r0, #0x1]
         strb r0, [r6, #0x0]
         cmp r2, #0x0
         bgt .Lb690
         mov r0, r7
         add r0, #0x20
         mov r1, #0xc0
         and r0, r1
         asr r0, #0x6
         cmp r0, #0x1
         beq .L7e62
         cmp r0, #0x1
         bgt .L6449
         cmp r0, #0x0
         beq .L6e54
         b .La280
     45cmp r0, #0x2
         beq .L8465
         cmp r0, #0x3
         beq .L9473
         b .La280
     47ldr r0, [r5, #0x14]
         add r0, r2
         str r0, [r5, #0x14]
         mov r1, #0x1a
         ldrsh r0, [r5, r1]
         neg r0, r0
         strh r0, [r5, #0x1a]
         b .La280
     43ldr r0, [r5, #0x10]
         sub r0, r2
         b .L9875
     50ldr r0, [r5, #0x14]
         sub r0, r2
         str r0, [r5, #0x14]
         mov r1, #0x1a
         ldrsh r0, [r5, r1]
         neg r0, r0
         strh r0, [r5, #0x1a]
         b .L9a76
     52ldr r0, [r5, #0x10]
         add r0, r2
     64str r0, [r5, #0x10]
     72mov r1, #0x18
         ldrsh r0, [r5, r1]
         neg r0, r0
         strh r0, [r5, #0x18]
     48mov r1, #0x1c
         ldrsh r0, [r5, r1]
         neg r0, r0
         mov r1, #0x0
         strh r0, [r5, #0x1c]
         mov r0, r5
         add r0, #0x99
         strb r1, [r0, #0x0]
         add r0, #0x1
         strb r1, [r0, #0x0]
     36add sp, #0x4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

# Primary Objective

Decompile the following target assembly function from `asm/code_z_1.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80C5FCC
sub_80C5FCC: @ 0x080C5FCC
	push {r4, r5, r6, r7, lr}
	mov r7, sl
	mov r6, sb
	mov r5, r8
	push {r5, r6, r7}
	sub sp, #0x10
	str r0, [sp, #4]
	ldr r0, [sp, #0x30]
	lsls r1, r1, #0x18
	lsrs r1, r1, #0x18
	mov r8, r1
	lsls r2, r2, #0x18
	lsrs r2, r2, #0x18
	str r2, [sp, #0xc]
	lsls r3, r3, #0x10
	lsrs r3, r3, #0x10
	lsls r0, r0, #0x10
	lsrs r0, r0, #0x10
	str r0, [sp, #8]
	movs r0, #0
	mov sb, r0
	movs r2, #0
	cmp sb, r8
	bge _080C609C
	ldr r1, [sp, #0xc]
	lsls r6, r1, #3
	lsls r3, r3, #0x10
	mov sl, r3
_080C6004:
	lsls r2, r2, #0x10
	asrs r0, r2, #0xe
	ldr r3, [sp, #4]
	adds r0, r0, r3
	ldr r4, [r0]
	ldr r3, [r4, #0x14]
	adds r0, r3, #0
	adds r0, #0x20
	adds r0, r0, r6
	ldr r1, [r0]
	movs r0, #1
	rsbs r0, r0, #0
	adds r5, r2, #0
	cmp r1, r0
	beq _080C6068
	adds r2, r3, r6
	adds r0, r2, #0
	adds r0, #0x24
	movs r1, #0
	ldrsb r1, [r0, r1]
	movs r7, #0x10
	ldrsh r0, [r3, r7]
	cmp r1, r0
	bgt _080C6068
	adds r0, r2, #0
	adds r0, #0x26
	movs r1, #0
	ldrsb r1, [r0, r1]
	movs r7, #0x10
	ldrsh r0, [r3, r7]
	cmp r1, r0
	blt _080C6068
	adds r0, r2, #0
	adds r0, #0x25
	movs r1, #0
	ldrsb r1, [r0, r1]
	movs r7, #0x12
	ldrsh r0, [r3, r7]
	cmp r1, r0
	bgt _080C6068
	adds r0, r2, #0
	adds r0, #0x27
	movs r1, #0
	ldrsb r1, [r0, r1]
	movs r2, #0x12
	ldrsh r0, [r3, r2]
	cmp r1, r0
	blt _080C6068
	movs r3, #1
	mov sb, r3
_080C6068:
	ldrb r0, [r4, #2]
	cmp r0, #0
	beq _080C608E
	adds r0, r4, #0
	adds r0, #0x30
	ldrb r1, [r4, #2]
	ldr r4, [sp, #8]
	lsls r2, r4, #0x10
	asrs r2, r2, #0x10
	str r2, [sp]
	ldr r2, [sp, #0xc]
	mov r7, sl
	asrs r3, r7, #0x10
	bl sub_80C5FCC
	cmp r0, #0
	beq _080C608E
	movs r0, #1
	mov sb, r0
_080C608E:
	movs r1, #0x80
	lsls r1, r1, #9
	adds r0, r5, r1
	lsrs r2, r0, #0x10
	asrs r0, r0, #0x10
	cmp r0, r8
	blt _080C6004
_080C609C:
	mov r0, sb
	add sp, #0x10
	pop {r3, r4, r5}
	mov r8, r3
	mov sb, r4
	mov sl, r5
	pop {r4, r5, r6, r7}
	pop {r1}
	bx r1
	.align 2, 0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
