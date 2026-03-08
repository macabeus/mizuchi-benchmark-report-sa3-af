You are decompiling an assembly function called `sub_806B2F4` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_801C884`

```c
s32 sub_801C884(Player *p)
{
    u8 rotation;
    s32 res;

    if (p->moveState & 1) {
        s32 qWorldX = I(p->qWorldX) - 2;
        res = sub_80517FC(qWorldX - p->spriteOffsetX, I(p->qWorldY), p->layer, -8, &rotation, sub_805203C);
        if (1 & rotation) {
            p->unk26 = +0x40;
        } else {
            p->unk26 = rotation;
        }
    } else {
        s32 qWorldX = I(p->qWorldX) + 2;
        res = sub_80517FC(qWorldX + p->spriteOffsetX, I(p->qWorldY), p->layer, +8, &rotation, sub_805203C);
        if (!(1 & rotation)) {
            p->unk26 = rotation;
        } else {
            p->unk26 = -0x40;
        }
    }
    return res;
}
```

```asm
         push {r4, r5, r6, lr}
         sub sp, #0xc
         mov r5, r0
         ldr r0, [r5, #0x4]
         mov r6, #0x1
         and r0, r6
         cmp r0, #0x0
         beq .L5842
         ldr r0, [r5, #0x10]
         asr r0, #0x8
         sub r0, #0x2
         mov r1, r5
         add r1, #0x24
         ldrb r1, [r1, #0x0]
         lsl r1, #0x18
         asr r1, #0x18
         sub r0, r1
         ldr r1, [r5, #0x14]
         asr r1, #0x8
         mov r2, r5
         add r2, #0x27
         ldrb r2, [r2, #0x0]
         mov r3, #0x8
         neg r3, r3
         add r4, sp, #0x8
         str r4, [sp, #0x0]
         ldr r4, [pc, #0x1c] # REFERENCE_.L54
         str r4, [sp, #0x4]
         bl sub_80517FC-0x4
         mov r2, r0
         add r0, sp, #0x8
         ldrb r1, [r0, #0x0]
         mov r0, r6
         and r0, r1
         cmp r0, #0x0
         beq .L9069
         mov r1, r5
         add r1, #0x26
         mov r0, #0x40
         b .La277
         .hword 0x0
         .word sub_805203C
     7ldr r0, [r5, #0x10]
         asr r0, #0x8
         add r0, #0x2
         mov r1, r5
         add r1, #0x24
         ldrb r1, [r1, #0x0]
         lsl r1, #0x18
         asr r1, #0x18
         add r0, r1
         ldr r1, [r5, #0x14]
         asr r1, #0x8
         mov r2, r5
         add r2, #0x27
         ldrb r2, [r2, #0x0]
         add r3, sp, #0x8
         str r3, [sp, #0x0]
         ldr r3, [pc, #0x1c] # REFERENCE_.L98
         str r3, [sp, #0x4]
         mov r3, #0x8
         bl sub_80517FC-0x4
         mov r2, r0
         add r0, sp, #0x8
         ldrb r1, [r0, #0x0]
         mov r0, r6
         and r0, r1
         cmp r0, #0x0
         bne .L9c74
     35mov r0, r5
         add r0, #0x26
         strb r1, [r0, #0x0]
         b .La478
         .word sub_805203C
     68mov r1, r5
         add r1, #0x26
         mov r0, #0xc0
     39strb r0, [r1, #0x0]
     72mov r0, r2
         add sp, #0xc
         pop {r4, r5, r6}
         pop {r1}
         bx r1
```

## `sub_8063BB8`

```c
void sub_8063BB8(Marun *enemy)
{
    s32 screenX;
    s32 screenY;
    s8 res;

    if (enemy->direction < 0) {
        enemy->qPos.x += 0x100 + enemy->speed;
        enemy->rotation += Q(16. / 256.);
    } else {
        enemy->qPos.x -= 0x100 + enemy->speed;
        enemy->rotation -= Q(16. / 256.);
    }

    screenX = I(enemy->qPos.x);
    screenY = I(enemy->qPos.y);

    screenX = TO_WORLD_POS_RAW(screenX, enemy->region[0]);
    screenY = TO_WORLD_POS_RAW(screenY, enemy->region[1]);

    if ((res = sub_8052394(screenY, screenX, 1, 8, NULL, sub_805217C) <= 0 ? 0 : 1)) {
        enemy->qPos.y += Q(res);

        screenX = I(enemy->qPos.x);
        screenY = I(enemy->qPos.y);

        screenX = TO_WORLD_POS_RAW(screenX, enemy->region[0]);
        screenY = TO_WORLD_POS_RAW(screenY, enemy->region[1]);

        if (sub_8052394(screenY, screenX, 1, 8, NULL, sub_805217C) > 0) {
            enemy->qPos.y += enemy->unk18;
            enemy->unk18 += 0x20;
        }
    } else {
        enemy->unk18 = 0;
        sub_805CD70(&enemy->qPos, &enemy->qUnk1C, enemy->region, &enemy->unk9);
    }

    if (enemy->speed > 0) {
        enemy->speed -= 4;
    } else {
        enemy->speed = 0;
    }
}
```

```asm
         push {r4, r5, r6, lr}
         sub sp, #0x8
         mov r4, r0
         mov r0, #0xa
         ldrsb r0, [r4, r0]
         cmp r0, #0x0
         bge .L2217
         ldr r0, [r4, #0x24]
         mov r1, #0x80
         lsl r1, #0x1
         add r0, r1
         ldr r1, [r4, #0x14]
         add r0, r1
         str r0, [r4, #0x24]
         ldrh r0, [r4, #0x10]
         add r0, #0x10
         b .L3225
     6ldr r0, [r4, #0x24]
         ldr r1, [pc, #0x84] # REFERENCE_.Lac
         add r0, r1
         ldr r1, [r4, #0x14]
         sub r0, r1
         str r0, [r4, #0x24]
         ldrh r0, [r4, #0x10]
         sub r0, #0x10
     16strh r0, [r4, #0x10]
         ldr r0, [r4, #0x24]
         asr r2, r0, #0x8
         ldr r0, [r4, #0x28]
         asr r1, r0, #0x8
         ldrh r0, [r4, #0xc]
         lsl r0, #0x8
         add r2, r0
         ldrh r0, [r4, #0xe]
         lsl r0, #0x8
         add r1, r0
         mov r6, #0x0
         str r6, [sp, #0x0]
         ldr r5, [pc, #0x60] # REFERENCE_.Lb0
         str r5, [sp, #0x4]
         mov r0, r1
         mov r1, r2
         mov r2, #0x1
         mov r3, #0x8
         bl sub_8052394-0x4
         mov r1, #0x0
         cmp r0, #0x0
         ble .L6449
         mov r1, #0x1
     47lsl r0, r1, #0x18
         lsr r1, r0, #0x18
         asr r0, #0x18
         cmp r0, #0x0
         beq .Lb486
         lsl r1, #0x8
         ldr r0, [r4, #0x28]
         add r0, r1
         str r0, [r4, #0x28]
         ldr r1, [r4, #0x24]
         asr r2, r1, #0x8
         asr r1, r0, #0x8
         ldrh r0, [r4, #0xc]
         lsl r0, #0x8
         add r2, r0
         ldrh r0, [r4, #0xe]
         lsl r0, #0x8
         add r1, r0
         str r6, [sp, #0x0]
         str r5, [sp, #0x4]
         mov r0, r1
         mov r1, r2
         mov r2, #0x1
         mov r3, #0x8
         bl sub_8052394-0x4
         cmp r0, #0x0
         ble .Lca96
         ldr r0, [r4, #0x28]
         ldr r1, [r4, #0x18]
         add r0, r1
         str r0, [r4, #0x28]
         add r1, #0x20
         str r1, [r4, #0x18]
         b .Lca96
         .hword 0x0
         .word 0xffffff00
         .word sub_805217C
     53str r0, [r4, #0x18]
         mov r0, r4
         add r0, #0x24
         mov r1, r4
         add r1, #0x1c
         mov r2, r4
         add r2, #0xc
         mov r3, r4
         add r3, #0x9
         bl sub_805CD70-0x4
     75ldr r0, [r4, #0x14]
         cmp r0, #0x0
         ble .Ld4101
         sub r0, #0x4
         b .Ld6102
     98mov r0, #0x0
     100str r0, [r4, #0x14]
         add sp, #0x8
         pop {r4, r5, r6}
         pop {r0}
         bx r0
```

## `sub_8012A6C`

```c
void sub_8012A6C(Player *p)
{
    u8 sp8;
    u32 spC;
    u32 *pSpC, *pSpC2;
    s32 var_r0;
    s32 var_r0_2;
    s32 var_r2_2;
    s32 var_r2_3;
    s32 var_r2_4;
    u8 unk27;
    u8 *pUnk27;
    s32 worldX, worldY;
    s32 worldX2;
    u32 mask;
#ifndef NON_MATCHING
    register s32 temp_r0 asm("r0");
    register s32 res asm("r2");
#else
    s32 temp_r0;
    s32 res;
#endif

    pUnk27 = &p->layer;
    worldX = I(p->qWorldX) + 2;
    worldX2 = worldX + p->spriteOffsetX;
    worldY = I(p->qWorldY);
    unk27 = *pUnk27;
    if (p->qSpeedAirY < Q(3)) {
        unk27 |= 0x80;
    }
    temp_r0 = sub_80517FC(worldX2, worldY, unk27, +8, NULL, sub_805203C);
    res = temp_r0;
    if (res <= 0) {
        temp_r0 = Q(res);
        p->qWorldX += temp_r0;
        if (p->qSpeedAirX > 0) {
            p->unk148.arr_u8[2] |= 0x40;
        }
        p->qSpeedAirX = 0;
    }

    mask = p->moveState & 0x10000;
    pSpC = &spC;

    if (!mask) {
        var_r0 = sub_8011024(2, p, &sp8, pSpC);
    } else {
        var_r0 = sub_8011024(3, p, &sp8, pSpC);
    }
    var_r2_2 = var_r0;
    if (var_r2_2 <= 0) {
        if (p->moveState & 0x10000) {
            var_r2_2 = 0 - var_r2_2;
        }
        p->qWorldY -= var_r2_2 << 8;
        if (p->qSpeedAirY < 0) {
            p->qSpeedAirY = 0;
        }
    } else if (p->qSpeedAirY >= 0) {
        pSpC2 = &spC;
        var_r2_3 = 1;
        if (p->moveState & 0x10000) {
            var_r2_3 = 0;
        }
        if (var_r2_3 == 0) {
            var_r0_2 = sub_8011024(2, p, &sp8, pSpC2);
        } else {
            var_r0_2 = sub_8011024(3, p, &sp8, pSpC2);
        }
        var_r2_4 = var_r0_2;
        if (var_r2_4 <= 0) {
            if (p->moveState & 0x10000) {
                var_r2_4 = 0 - var_r2_4;
            }
            p->qWorldY += var_r2_4 << 8;
            p->unk26 = sp8;
            p->qSpeedAirY = 0;
            p->unk148.arr_u8[2] &= 0xFB;
        }
    }
}
```

```asm
         push {r4, r5, r6, lr}
         sub sp, #0x10
         mov r4, r0
         mov r2, r4
         add r2, #0x27
         ldr r0, [r4, #0x10]
         asr r0, #0x8
         add r0, #0x2
         mov r1, r4
         add r1, #0x24
         ldrb r1, [r1, #0x0]
         lsl r1, #0x18
         asr r1, #0x18
         add r5, r0, r1
         ldr r0, [r4, #0x14]
         asr r3, r0, #0x8
         ldrb r2, [r2, #0x0]
         mov r0, #0x1a
         ldrsh r1, [r4, r0]
         ldr r0, [pc, #0x5c] # REFERENCE_.L84
         cmp r1, r0
         bgt .L3024
         mov r0, #0x80
         orr r2, r0
     21mov r6, #0x0
         str r6, [sp, #0x0]
         ldr r0, [pc, #0x50] # REFERENCE_.L88
         str r0, [sp, #0x4]
         mov r0, r5
         mov r1, r3
         mov r3, #0x8
         bl sub_80517FC-0x4
         mov r2, r0
         cmp r2, #0x0
         bgt .L6851
         lsl r0, r2, #0x8
         ldr r1, [r4, #0x10]
         add r1, r0
         str r1, [r4, #0x10]
         mov r1, #0x18
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         ble .L6650
         mov r0, #0xa5
         lsl r0, #0x1
         add r2, r4, r0
         ldrb r1, [r2, #0x0]
         mov r0, #0x40
         orr r0, r1
         strb r0, [r2, #0x0]
     42strh r6, [r4, #0x18]
     34ldr r0, [r4, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         add r5, sp, #0xc
         cmp r0, #0x0
         bne .L8c66
         mov r0, #0x2
         mov r1, r4
         add r2, sp, #0x8
         mov r3, r5
         bl sub_8011024-0x4
         b .L9871
         .word 0x2ff
         .word sub_805203C
     57mov r0, #0x3
         mov r1, r4
         add r2, sp, #0x8
         mov r3, r5
         bl sub_8011024-0x4
     63mov r2, r0
         cmp r2, #0x0
         bgt .Lc292
         ldr r0, [r4, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .Lac81
         neg r2, r2
     79lsl r0, r2, #0x8
         ldr r1, [r4, #0x14]
         sub r1, r0
         str r1, [r4, #0x14]
         mov r1, #0x1a
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         bge .L130145
         mov r0, #0x0
         strh r0, [r4, #0x1a]
         b .L130145
     73mov r1, #0x1a
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         blt .L130145
         mov r3, r5
         mov r2, #0x1
         ldr r0, [r4, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .Ldc105
         mov r2, #0x0
     103cmp r2, #0x0
         bne .Lec112
         mov r0, #0x2
         mov r1, r4
         add r2, sp, #0x8
         bl sub_8011024-0x4
         b .Lf8117
     106mov r0, #0x3
         mov r1, r4
         add r2, sp, #0x8
         mov r3, r5
         bl sub_8011024-0x4
     111mov r2, r0
         cmp r2, #0x0
         bgt .L130145
         ldr r0, [r4, #0x4]
         mov r1, #0x80
         lsl r1, #0x9
         and r0, r1
         cmp r0, #0x0
         beq .L10c127
         neg r2, r2
     125lsl r1, r2, #0x8
         ldr r0, [r4, #0x14]
         add r0, r1
         str r0, [r4, #0x14]
         add r0, sp, #0x8
         ldrb r1, [r0, #0x0]
         mov r2, r4
         add r2, #0x26
         mov r0, #0x0
         strb r1, [r2, #0x0]
         strh r0, [r4, #0x1a]
         mov r0, #0xa5
         lsl r0, #0x1
         add r2, r4, r0
         ldrb r1, [r2, #0x0]
         mov r0, #0xfb
         and r0, r1
         strb r0, [r2, #0x0]
     88add sp, #0x10
         pop {r4, r5, r6}
         pop {r0}
         bx r0
```

## `sub_8045A5C`

```c
u32 sub_8045A5C(SpringInABox *spring, Player *p)
{
    Sprite *s = &spring->s;
    u32 res = sub_8020950(s, spring->worldX, spring->worldY, p, 0);

    if (res & 0x10000) {
        p->qWorldY += Q_8_8(res + 1);
    } else if (res & 0x20000) {
        p->qWorldY += Q(1) + Q_8_8(res);
        p->qSpeedAirY = 0;
    } else if (res & 0x40000) {
        p->qWorldX += (s16)(res & 0xFF00);

        if (p->qSpeedAirX < 0) {
            p->qSpeedAirX = 0;
        }

        p->qSpeedGround = 0;

        if (p->keyInput & DPAD_LEFT) {
            p->qWorldX -= Q(1);
            p->moveState |= MOVESTATE_40;
        }
    } else if (res & 0x80000) {
        p->qWorldX += (s16)(res & 0xFF00);

        if (p->qSpeedAirX > 0) {
            p->qSpeedAirX = 0;
        }
        p->qSpeedGround = 0;

        if (p->keyInput & DPAD_RIGHT) {
            p->qWorldX += Q(1);
            p->moveState |= MOVESTATE_40;
        }
    }

    return res;
}
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         mov r4, r1
         mov r3, r0
         add r3, #0x1c
         mov r2, #0xa
         ldrsh r1, [r0, r2]
         mov r5, #0xc
         ldrsh r2, [r0, r5]
         mov r0, #0x0
         str r0, [sp, #0x0]
         mov r0, r3
         mov r3, r4
         bl sub_8020950-0x4
         mov r2, r0
         mov r3, #0x80
         lsl r3, #0x9
         and r3, r2
         cmp r3, #0x0
         beq .L3827
         add r1, r2, #0x1
         lsl r1, #0x18
         asr r1, #0x10
         ldr r0, [r4, #0x14]
         add r0, r1
         str r0, [r4, #0x14]
         b .Lda107
     19mov r5, #0x80
         lsl r5, #0xa
         and r5, r2
         cmp r5, #0x0
         beq .L5642
         ldr r1, [r4, #0x14]
         mov r0, #0x80
         lsl r0, #0x1
         add r1, r0
         lsl r0, r2, #0x18
         asr r0, #0x10
         add r1, r0
         str r1, [r4, #0x14]
         strh r3, [r4, #0x1a]
         b .Lda107
     31mov r3, #0x80
         lsl r3, #0xb
         and r3, r2
         cmp r3, #0x0
         beq .L9472
         mov r0, #0xff
         lsl r0, #0x8
         mov r1, r0
         mov r0, r2
         and r0, r1
         lsl r0, #0x10
         asr r0, #0x10
         ldr r1, [r4, #0x10]
         add r1, r0
         str r1, [r4, #0x10]
         mov r1, #0x18
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         bge .L7e62
         strh r5, [r4, #0x18]
     60strh r5, [r4, #0x1c]
         ldrh r1, [r4, #0x1e]
         mov r0, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .Lda107
         ldr r0, [r4, #0x10]
         ldr r5, [pc, #0x0] # REFERENCE_.L90
         b .Lce101
         .word 0xffffff00
     46mov r0, #0x80
         lsl r0, #0xc
         and r0, r2
         cmp r0, #0x0
         beq .Lda107
         mov r0, #0xff
         lsl r0, #0x8
         mov r1, r0
         mov r0, r2
         and r0, r1
         lsl r0, #0x10
         asr r0, #0x10
         ldr r1, [r4, #0x10]
         add r1, r0
         str r1, [r4, #0x10]
         mov r1, #0x18
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         ble .Lbc92
         strh r3, [r4, #0x18]
     90strh r3, [r4, #0x1c]
         ldrh r1, [r4, #0x1e]
         mov r0, #0x10
         and r0, r1
         cmp r0, #0x0
         beq .Lda107
         ldr r0, [r4, #0x10]
         mov r5, #0x80
         lsl r5, #0x1
     70add r0, r5
         str r0, [r4, #0x10]
         ldr r0, [r4, #0x4]
         mov r1, #0x40
         orr r0, r1
         str r0, [r4, #0x4]
     26mov r0, r2
         add sp, #0x4
         pop {r4, r5}
         pop {r1}
         bx r1
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

# Declarations for the functions called from the target assembly

- `u8 sub_805203C(s32 worldX, s32 worldY, s32 param2, s32 param3, void *param4);`
- `s32 sub_8052394(s32 worldX, s32 worldY, s32 param2, s32 param3, void *param4, void *callback);`

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_806B2F4
sub_806B2F4: @ 0x0806B2F4
	push {r4, r5, lr}
	sub sp, #8
	adds r4, r0, #0
	ldr r0, [r1]
	ldr r1, [r1, #4]
	movs r3, #8
	rsbs r3, r3, #0
	adds r2, r4, #0
	adds r2, #0x1e
	str r2, [sp]
	ldr r2, _0806B33C @ =sub_805203C
	str r2, [sp, #4]
	movs r2, #0
	bl sub_8052394
	lsls r0, r0, #0x18
	lsrs r3, r0, #0x18
	ldrb r0, [r4, #0x1e]
	cmp r0, #0
	bne _0806B320
	movs r0, #0x40
	strb r0, [r4, #0x1e]
_0806B320:
	adds r0, r4, #0
	adds r0, #0x20
	ldrb r2, [r0]
	adds r5, r0, #0
	cmp r2, #0
	bne _0806B340
	adds r1, r4, #0
	adds r1, #0x24
	movs r0, #0xff
	strb r0, [r1]
	ldr r0, [r4, #0x40]
	str r0, [r4, #0x44]
	ldr r0, [r4, #0x38]
	b _0806B354
	.align 2, 0
_0806B33C: .4byte sub_805203C
_0806B340:
	adds r1, r4, #0
	adds r1, #0x24
	cmp r2, #1
	bne _0806B356
	strb r2, [r1]
	ldr r0, [r4, #0x40]
	rsbs r0, r0, #0
	str r0, [r4, #0x44]
	ldr r0, [r4, #0x38]
	rsbs r0, r0, #0
_0806B354:
	str r0, [r4, #0x3c]
_0806B356:
	ldrb r0, [r4, #0x1d]
	cmp r0, #1
	beq _0806B362
	ldr r0, [r4, #0x44]
	adds r0, #2
	str r0, [r4, #0x44]
_0806B362:
	ldr r0, [r4, #0x3c]
	cmp r0, #0
	ble _0806B36C
	movs r0, #1
	b _0806B36E
_0806B36C:
	movs r0, #0xff
_0806B36E:
	strb r0, [r1]
	movs r0, #0
	str r0, [r4, #0x38]
	str r0, [r4, #0x40]
	movs r0, #2
	strb r0, [r5]
	movs r0, #0xff
	lsls r0, r0, #0x18
	asrs r0, r0, #0x18
	cmp r0, #0
	beq _0806B39C
	cmp r0, #0
	ble _0806B392
	lsls r1, r3, #0x18
	asrs r1, r1, #0x10
	ldr r0, [r4]
	adds r0, r0, r1
	b _0806B39A
_0806B392:
	lsls r1, r3, #0x18
	asrs r1, r1, #0x10
	ldr r0, [r4]
	subs r0, r0, r1
_0806B39A:
	str r0, [r4]
_0806B39C:
	add sp, #8
	pop {r4, r5}
	pop {r0}
	bx r0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
