You are decompiling an assembly function called `sub_807ECFC` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_805A04C`

```c
bool32 sub_805A04C(Buzzer *enemy)
{
    Sprite *s = &enemy->s;
    Player *p;
    s32 worldX;
    s32 worldY;
    s32 qWorldX;
    s32 dir;
    u8 i;

    worldX = I(enemy->qPos.x);
    worldY = I(enemy->qPos.y);
    worldX = (TO_WORLD_POS_RAW(worldX, enemy->region[0]));
    worldY = (TO_WORLD_POS_RAW(worldY, enemy->region[1]));

    for (i = 0, qWorldX = Q(worldX); i < NUM_SINGLE_PLAYER_CHARS; i++) {
        Player *p = sub_805CD20(i);
        if (p == NULL)
            break;

        dir = (u16)sa2__sub_8004418(I(p->qWorldY) - worldY, I(p->qWorldX) - worldX);

        if ((((u16)(dir - 1) <= 254) && (s->frameFlags & SPRITE_FLAG_MASK_X_FLIP))
            || ((((u16)(dir + (-Q(1) - 1)) <= 254)) && !(s->frameFlags & SPRITE_FLAG_MASK_X_FLIP))) {
            if ((ABS(worldX - I(p->qWorldX)) < 100) && (ABS(worldY - I(p->qWorldY)) < 100)) {
                enemy->unkE = dir;
                return TRUE;
            }
        }
    }

    return FALSE;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r8
         push {r7}
         sub sp, #0x4
         mov r7, r0
         mov r0, #0x28
         add r0, r7
         mov r8, r0
         ldr r0, [r7, #0x18]
         asr r6, r0, #0x8
         ldr r0, [r7, #0x1c]
         asr r5, r0, #0x8
         ldrh r0, [r7, #0xa]
         lsl r0, #0x8
         add r6, r0
         ldrh r0, [r7, #0xc]
         lsl r0, #0x8
         add r5, r0
         mov r3, #0x0
         b .Lbc91
     99ldr r0, [r4, #0x14]
         asr r0, #0x8
         sub r0, r5
         lsl r0, #0x10
         asr r0, #0x10
         ldr r1, [r4, #0x10]
         asr r1, #0x8
         sub r1, r6
         lsl r1, #0x10
         asr r1, #0x10
         str r3, [sp, #0x0]
         bl sa2__sub_8004418-0x4
         lsl r0, #0x10
         lsr r2, r0, #0x10
         ldr r1, [pc, #0x44] # REFERENCE_.L8c
         add r0, r1
         lsr r0, #0x10
         ldr r3, [sp, #0x0]
         cmp r0, #0xfe
         bhi .L6047
         mov r1, r8
         ldr r0, [r1, #0x8]
         mov r1, #0x80
         lsl r1, #0x3
         and r0, r1
         cmp r0, #0x0
         bne .L7a60
     39ldr r1, [pc, #0x2c] # REFERENCE_.L90
         add r0, r2, r1
         lsl r0, #0x10
         lsr r0, #0x10
         cmp r0, #0xfe
         bhi .Lb688
         mov r1, r8
         ldr r0, [r1, #0x8]
         mov r1, #0x80
         lsl r1, #0x3
         and r0, r1
         cmp r0, #0x0
         bne .Lb688
     46ldr r0, [r4, #0x10]
         asr r0, #0x8
         sub r1, r6, r0
         cmp r1, #0x0
         blt .L9471
         cmp r1, #0x63
         ble .L9a74
         b .Lb688
         .hword 0x0
         .word 0xffff0000
         .word 0xfffffeff
     64sub r0, r6
         cmp r0, #0x63
         bgt .Lb688
     66ldr r0, [r4, #0x14]
         asr r0, #0x8
         sub r1, r5, r0
         cmp r1, #0x0
         blt .Laa82
         cmp r1, #0x63
         ble .Lb085
         b .Lb688
     78sub r0, r5
         cmp r0, #0x63
         bgt .Lb688
     80strh r2, [r7, #0xe]
         mov r0, #0x1
         b .Ld2101
     52add r0, r3, #0x1
         lsl r0, #0x18
         lsr r3, r0, #0x18
     19cmp r3, #0x1
         bhi .Ld0100
         mov r0, r3
         str r3, [sp, #0x0]
         bl sub_805CD20-0x4
         mov r4, r0
         ldr r3, [sp, #0x0]
         cmp r4, #0x0
         bne .L2820
     92mov r0, #0x0
     87add sp, #0x4
         pop {r3}
         mov r8, r3
         pop {r4, r5, r6, r7}
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

## `sub_807EBB8`

```c
void sub_807EBB8() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         sub sp, #0x8
         mov r7, r0
         lsl r1, #0x18
         lsr r6, r1, #0x18
         lsl r0, r6, #0x2
         add r0, r6
         lsl r0, #0x3
         mov r1, #0xa2
         lsl r1, #0x1
         add r0, r1
         add r5, r7, r0
         lsl r0, r6, #0x1
         add r0, r6
         lsl r0, #0x2
         mov r2, #0xd0
         lsl r2, #0x2
         add r0, r2
         add r2, r7, r0
         ldrh r0, [r5, #0x16]
         cmp r0, #0xa
         beq .Le0105
         cmp r0, #0xa
         bgt .L3627
         cmp r0, #0x0
         beq .L3c30
         b .L136146
     23cmp r0, #0x14
         beq .L104122
         b .L136146
     25cmp r6, #0x0
         bne .L5039
         ldr r0, [r5, #0x0]
         asr r0, #0x8
         ldr r3, [pc, #0x4] # REFERENCE_.L4c
         mov r1, r3
         b .L5843
         .hword 0x0
         .word 0x614
     31ldr r0, [r5, #0x0]
         asr r0, #0x8
         ldr r2, [pc, #0x54] # REFERENCE_.Lac
         mov r1, r2
     36sub r1, r0
         lsl r1, #0x10
         lsr r1, #0x10
         ldr r2, [pc, #0x50] # REFERENCE_.Lb0
         ldr r0, [sp, #0x0]
         and r0, r2
         orr r0, r1
         str r0, [sp, #0x0]
         ldr r0, [r5, #0x4]
         asr r0, #0x8
         mov r1, #0x98
         sub r1, r0
         lsl r1, #0x10
         ldr r2, [pc, #0x40] # REFERENCE_.Lb4
         ldr r0, [sp, #0x0]
         and r0, r2
         orr r0, r1
         str r0, [sp, #0x0]
         ldr r1, [pc, #0x30] # REFERENCE_.Lb0
         mov r4, sp
         ldr r0, [sp, #0x4]
         and r0, r1
         str r0, [sp, #0x4]
         mov r0, sp
         mov r1, #0x8
         bl sa2__sub_8085A9C-0x4
         mov r0, sp
         mov r3, #0x0
         ldrsh r0, [r0, r3]
         lsl r0, #0x1
         str r0, [r5, #0x8]
         mov r1, #0x2
         ldrsh r0, [r4, r1]
         lsl r0, #0x1
         str r0, [r5, #0xc]
         cmp r6, #0x0
         beq .Lb887
         cmp r6, #0x1
         beq .Lc894
         b .Ld8102
         .hword 0x0
         .word 0x6dc
         .word 0xffff0000
         .word 0xffff
     79mov r3, #0x9e
         lsl r3, #0x2
         add r2, r7, r3
         ldr r0, [pc, #0x4] # REFERENCE_.Lc4
         b .Ld098
         .hword 0x0
         .word gUnknown_080D5C08
     81mov r0, #0xa8
         lsl r0, #0x2
         add r2, r7, r0
         ldr r0, [pc, #0xc] # REFERENCE_.Ldc
     91ldrh r1, [r0, #0x14]
         strh r1, [r2, #0xc]
         ldrh r0, [r0, #0x16]
         strb r0, [r2, #0x1a]
     82mov r0, #0xa
         b .L134145
         .word gUnknown_080D5C20
     21cmp r6, #0x0
         bne .Lea110
         ldrh r0, [r2, #0x0]
         add r0, #0x8
         b .Lee112
     106ldrh r0, [r2, #0x0]
         sub r0, #0x8
     109ldr r3, [pc, #0x10] # REFERENCE_.L100
         mov r1, r3
         and r0, r1
         strh r0, [r2, #0x0]
         ldrh r0, [r2, #0x0]
         cmp r0, #0x0
         bne .L136146
         mov r0, #0x14
         b .L134145
         .word 0x3ff
     28ldr r1, [r5, #0x0]
         ldr r0, [r5, #0x8]
         add r2, r1, r0
         str r2, [r5, #0x0]
         ldr r0, [r5, #0x4]
         ldr r1, [r5, #0xc]
         add r0, r1
         str r0, [r5, #0x4]
         cmp r6, #0x0
         bne .L12c141
         ldr r0, [pc, #0xc] # REFERENCE_.L128
         cmp r2, r0
         bgt .L136146
         mov r0, #0x1e
         strh r0, [r5, #0x16]
         mov r0, #0x64
         strh r0, [r7, #0xc]
         b .L136146
         .word 0x61400
     131ldr r0, [pc, #0x10] # REFERENCE_.L140
         cmp r2, r0
         ble .L136146
         mov r0, #0x1e
     103strh r0, [r5, #0x16]
     26add sp, #0x8
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x6dbff
```

## `sub_805BB80`

```c
bool32 sub_805BB80(Jousun *enemy)
{
    s32 r5 = 2;
    u8 r4 = 0;
    Sprite *s;

    if (enemy->qUnk1C < enemy->qUnk14 - (enemy->region[1] << 16)) {
        enemy->qPos.y += Q(4);

        if (enemy->qPos.y > enemy->qUnk14 - (enemy->region[1] << 16)) {
            enemy->qPos.y = enemy->qUnk14 - (enemy->region[1] << 16);
            r4 = 1;
        }
    } else {
        enemy->qPos.y -= Q(4);

        if (enemy->qPos.y < enemy->qUnk14 - (enemy->region[1] << 16)) {
            enemy->qPos.y = enemy->qUnk14 - (enemy->region[1] << 16);
            r4 = 1;
        }
    }

    s = &enemy->s;

    if (s->frameFlags & SPRITE_FLAG(X_FLIP, 1)) {
        enemy->qPos.x -= (1 << (r5 + 8));

        if (enemy->qPos.x <= enemy->qUnk28.x - Q(60)) {
            enemy->qPos.x = enemy->qUnk28.x - Q(60);
            r4++;
        }
    } else {
        enemy->qPos.x += (1 << (r5 + 8));

        if (enemy->qPos.x >= enemy->qUnk28.x + Q(60)) {
            enemy->qPos.x = enemy->qUnk28.x + Q(60);
            r4++;
        }
    }

    if (r4 == 2) {
        return TRUE;
    } else {
        return FALSE;
    }
}
```

```asm
         push {r4, r5, lr}
         mov r2, r0
         mov r5, #0x2
         mov r4, #0x0
         ldrh r0, [r2, #0xc]
         lsl r0, #0x10
         ldr r3, [r2, #0x14]
         sub r0, r3, r0
         ldr r1, [r2, #0x1c]
         cmp r1, r0
         bge .L2c22
         ldr r1, [r2, #0x24]
         mov r0, #0x80
         lsl r0, #0x3
         add r1, r0
         str r1, [r2, #0x24]
         ldrh r0, [r2, #0xc]
         lsl r0, #0x10
         sub r0, r3, r0
         cmp r1, r0
         ble .L4233
         b .L3e31
     10ldr r1, [r2, #0x24]
         ldr r0, [pc, #0x38] # REFERENCE_.L68
         add r1, r0
         str r1, [r2, #0x24]
         ldrh r0, [r2, #0xc]
         lsl r0, #0x10
         sub r0, r3, r0
         cmp r1, r0
         bge .L4233
     21str r0, [r2, #0x24]
         mov r4, #0x1
     20ldr r0, [r2, #0x38]
         mov r1, #0x80
         lsl r1, #0x3
         and r0, r1
         cmp r0, #0x0
         beq .L7054
         mov r1, r5
         add r1, #0x8
         mov r0, #0x1
         lsl r0, r1
         ldr r1, [r2, #0x20]
         sub r1, r0
         str r1, [r2, #0x20]
         ldr r0, [r2, #0x28]
         ldr r3, [pc, #0xc] # REFERENCE_.L6c
         add r0, r3
         cmp r1, r0
         bgt .L9271
         b .L8a67
         .word 0xfffffc00
         .word 0xffffc400
     38mov r1, r5
         add r1, #0x8
         mov r0, #0x1
         lsl r0, r1
         ldr r1, [r2, #0x20]
         add r1, r0
         str r1, [r2, #0x20]
         ldr r0, [r2, #0x28]
         mov r3, #0xf0
         lsl r3, #0x6
         add r0, r3
         cmp r1, r0
         blt .L9271
     51str r0, [r2, #0x20]
         add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
     50cmp r4, #0x2
         beq .L9a75
         mov r0, #0x0
         b .L9c76
     72mov r0, #0x1
     74pop {r4, r5}
         pop {r1}
         bx r1
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

# Primary Objective

Decompile the following target assembly function from `src/platform/shared/stub.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
         push {r4, r5, r6, lr}
         sub sp, #0x10
         mov r6, r0
         lsl r1, #0x18
         lsr r1, #0x18
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r1, #0xa2
         lsl r1, #0x1
         add r0, r1
         add r4, r6, r0
         ldrh r1, [r4, #0x16]
         cmp r1, #0x0
         beq .L2418
         cmp r1, #0xa
         beq .L3425
         b .L8866
     14str r1, [r4, #0x8]
         ldr r0, [pc, #0x8] # REFERENCE_.L30
         str r0, [r4, #0xc]
         strh r1, [r4, #0x14]
         mov r0, #0xa
         b .L8665
         .word 0xfffffd00
     16ldr r1, [r4, #0x0]
         ldr r0, [r4, #0x8]
         add r3, r1, r0
         str r3, [r4, #0x0]
         ldr r1, [r4, #0x4]
         ldr r0, [r4, #0xc]
         add r2, r1, r0
         str r2, [r4, #0x4]
         add r0, #0x40
         str r0, [r4, #0xc]
         ldrh r0, [r4, #0x14]
         add r0, #0x1
         mov r5, #0x0
         strh r0, [r4, #0x14]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L7657
         lsl r1, r3, #0x8
         asr r1, #0x10
         lsl r2, #0x8
         asr r2, #0x10
         mov r3, #0xc0
         lsl r3, #0x2
         str r5, [sp, #0x0]
         mov r0, #0x1e
         str r0, [sp, #0x4]
         str r5, [sp, #0x8]
         ldr r0, [r6, #0x18]
         str r0, [sp, #0xc]
         mov r0, #0x7
         bl sub_8079758-0x4
     42ldr r0, [r4, #0x4]
         asr r0, #0x8
         mov r1, #0x96
         lsl r1, #0x9
         cmp r0, r1
         ble .L8866
         mov r0, #0xfa
         lsl r0, #0x2
     23strh r0, [r4, #0x16]
     17add sp, #0x10
         pop {r4, r5, r6}
         pop {r0}
         bx r0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
