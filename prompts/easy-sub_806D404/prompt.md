You are decompiling an assembly function called `sub_806D404` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_8088440`

```c
void sub_8088440() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r9
         mov r6, r8
         push {r6, r7}
         sub sp, #0x8
         ldr r0, [pc, #0x168] # REFERENCE_.L174
         ldr r0, [r0, #0x0]
         ldrh r2, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r2, r0
         mov r5, #0x0
         ldr r6, [r4, #0x7c]
         mov r0, #0xaa
         lsl r0, #0x8
         str r0, [r4, #0x38]
         str r0, [r4, #0x40]
         mov r0, #0xa0
         lsl r0, #0x7
         str r0, [r4, #0x58]
         mov r1, #0x1
         strb r1, [r4, #0x6]
         ldr r0, [pc, #0x148] # REFERENCE_.L178
         add r2, r0
         mov r0, #0xc0
         lsl r0, #0x1
         strh r0, [r2, #0x0]
         strb r1, [r4, #0x3]
         ldrh r0, [r4, #0x10]
         strb r0, [r4, #0xc]
         strh r1, [r4, #0x10]
         strb r0, [r4, #0xd]
         mov r0, #0xc8
         lsl r0, #0x7
         str r0, [r4, #0x3c]
         mov r0, #0x82
         lsl r0, #0x8
         str r0, [r4, #0x44]
         ldr r2, [pc, #0x12c] # REFERENCE_.L17c
         mov r1, #0x0
         mov r8, r1
         mov r7, #0x0
     92lsl r0, r5, #0x2
         add r0, r5
         lsl r0, #0x3
         mov r1, #0xde
         lsl r1, #0x1
         add r0, r1
         add r1, r4, r0
         str r6, [r1, #0x0]
         mov r0, #0x80
         lsl r0, #0x4
         add r6, r0
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrh r0, [r0, #0x0]
         strh r0, [r1, #0xc]
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrb r0, [r0, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         ldr r0, [r4, #0x38]
         asr r0, #0x8
         strh r0, [r1, #0x10]
         ldr r0, [r4, #0x3c]
         asr r0, #0x8
         strh r0, [r1, #0x12]
         mov r0, #0xc0
         strh r0, [r1, #0x14]
         strh r7, [r1, #0xe]
         strh r7, [r1, #0x16]
         mov r0, #0x10
         strb r0, [r1, #0x1c]
         mov r0, r8
         strb r0, [r1, #0x1f]
         str r7, [r1, #0x8]
         mov r0, r1
         str r2, [sp, #0x4]
         bl UpdateSpriteAnimation-0x4
         add r0, r5, #0x1
         lsl r0, #0x18
         lsr r5, r0, #0x18
         ldr r2, [sp, #0x4]
         cmp r5, #0x1
         bls .L5442
         mov r5, #0x0
         mov r1, #0xd
         add r1, r4
         mov r8, r1
         ldr r2, [pc, #0xb8] # REFERENCE_.L180
         mov r0, #0x0
         mov r9, r0
         mov r7, #0x0
     151lsl r0, r5, #0x2
         add r0, r5
         lsl r0, #0x3
         mov r1, #0x83
         lsl r1, #0x2
         add r0, r1
         add r1, r4, r0
         str r6, [r1, #0x0]
         mov r0, #0x80
         lsl r0, #0x4
         add r6, r0
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrh r0, [r0, #0x0]
         strh r0, [r1, #0xc]
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrb r0, [r0, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         ldr r0, [r4, #0x40]
         asr r0, #0x8
         strh r0, [r1, #0x10]
         ldr r0, [r4, #0x44]
         asr r0, #0x8
         strh r0, [r1, #0x12]
         mov r0, #0xc0
         strh r0, [r1, #0x14]
         strh r7, [r1, #0xe]
         strh r7, [r1, #0x16]
         mov r0, #0x10
         strb r0, [r1, #0x1c]
         mov r0, r9
         strb r0, [r1, #0x1f]
         str r7, [r1, #0x8]
         mov r0, r1
         str r2, [sp, #0x4]
         bl UpdateSpriteAnimation-0x4
         add r0, r5, #0x1
         lsl r0, #0x18
         lsr r5, r0, #0x18
         ldr r2, [sp, #0x4]
         cmp r5, #0x1
         bls .Lcc101
         mov r0, #0x26
         str r0, [sp, #0x0]
         mov r0, #0x0
         mov r1, r8
         mov r2, r6
         mov r3, #0x64
         bl sub_808A1B0-0x4
         mov r0, #0x2
         strb r0, [r4, #0xb]
         mov r1, #0xdc
         lsl r1, #0x2
         add r0, r4, r1
         ldr r1, [pc, #0x34] # REFERENCE_.L184
         ldrh r1, [r1, #0x2]
         strh r1, [r0, #0x1c]
         mov r1, #0x6
         strh r1, [r0, #0x2e]
         bl DrawBackground-0x4
         ldr r0, [pc, #0x14] # REFERENCE_.L174
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x24] # REFERENCE_.L188
         str r0, [r1, #0x8]
         add sp, #0x8
         pop {r3, r4}
         mov r8, r3
         mov r9, r4
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word gCurTask
         .word 0x3000074
```

## `sub_8088770`

```c
void sub_8088770() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r8
         push {r7}
         sub sp, #0x4
         ldr r0, [pc, #0x154] # REFERENCE_.L160
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         mov r5, #0x0
         ldr r6, [r4, #0x7c]
         mov r0, #0xaa
         lsl r0, #0x8
         str r0, [r4, #0x38]
         str r0, [r4, #0x40]
         mov r0, #0xa0
         lsl r0, #0x7
         str r0, [r4, #0x58]
         mov r2, #0x1
         strb r2, [r4, #0x6]
         ldr r0, [pc, #0x138] # REFERENCE_.L164
         add r1, r0
         mov r0, #0xc0
         lsl r0, #0x1
         strh r0, [r1, #0x0]
         strb r2, [r4, #0x3]
         ldrh r0, [r4, #0x10]
         strb r0, [r4, #0xc]
         add r0, #0x1
         strb r0, [r4, #0xb]
         strh r5, [r4, #0x10]
         ldr r0, [r4, #0x1c]
         mov r1, #0xd0
         lsl r1, #0x5
         add r0, r1
         str r0, [r4, #0x3c]
         ldr r0, [r4, #0x2c]
         mov r1, #0xc0
         lsl r1, #0x3
         add r0, r1
         str r0, [r4, #0x44]
         ldr r2, [pc, #0x110] # REFERENCE_.L168
         mov r0, #0x0
         mov r8, r0
         mov r7, #0x0
     96lsl r0, r5, #0x2
         add r0, r5
         lsl r0, #0x3
         mov r1, #0xde
         lsl r1, #0x1
         add r0, r1
         add r1, r4, r0
         str r6, [r1, #0x0]
         mov r0, #0x80
         lsl r0, #0x4
         add r6, r0
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrh r0, [r0, #0x0]
         strh r0, [r1, #0xc]
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrb r0, [r0, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         ldr r0, [r4, #0x38]
         asr r0, #0x8
         strh r0, [r1, #0x10]
         ldr r0, [r4, #0x3c]
         asr r0, #0x8
         strh r0, [r1, #0x12]
         mov r0, #0xc0
         strh r0, [r1, #0x14]
         strh r7, [r1, #0xe]
         strh r7, [r1, #0x16]
         mov r0, #0x10
         strb r0, [r1, #0x1c]
         mov r0, r8
         strb r0, [r1, #0x1f]
         str r7, [r1, #0x8]
         mov r0, r1
         str r2, [sp, #0x0]
         bl UpdateSpriteAnimation-0x4
         add r0, r5, #0x1
         lsl r0, #0x18
         lsr r5, r0, #0x18
         ldr r2, [sp, #0x0]
         cmp r5, #0x1
         bls .L5c46
         mov r5, #0x0
         ldr r2, [pc, #0xa4] # REFERENCE_.L16c
         mov r1, #0x0
         mov r8, r1
         mov r7, #0x0
     152lsl r0, r5, #0x2
         add r0, r5
         lsl r0, #0x3
         mov r1, #0x83
         lsl r1, #0x2
         add r0, r1
         add r1, r4, r0
         str r6, [r1, #0x0]
         mov r0, #0x80
         lsl r0, #0x4
         add r6, r0
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrh r0, [r0, #0x0]
         strh r0, [r1, #0xc]
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1
         add r0, r5, r0
         lsl r0, #0x3
         add r0, r2
         ldrb r0, [r0, #0x2]
         strb r0, [r1, #0x1a]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         ldr r0, [r4, #0x40]
         asr r0, #0x8
         strh r0, [r1, #0x10]
         ldr r0, [r4, #0x44]
         asr r0, #0x8
         strh r0, [r1, #0x12]
         mov r0, #0xc0
         strh r0, [r1, #0x14]
         strh r7, [r1, #0xe]
         strh r7, [r1, #0x16]
         mov r0, #0x10
         strb r0, [r1, #0x1c]
         mov r0, r8
         strb r0, [r1, #0x1f]
         str r7, [r1, #0x8]
         mov r0, r1
         str r2, [sp, #0x0]
         bl UpdateSpriteAnimation-0x4
         add r0, r5, #0x1
         lsl r0, #0x18
         lsr r5, r0, #0x18
         ldr r2, [sp, #0x0]
         cmp r5, #0x1
         bls .Lce102
         mov r1, #0xdc
         lsl r1, #0x2
         add r0, r4, r1
         ldr r1, [pc, #0x30] # REFERENCE_.L170
         ldrh r1, [r1, #0x0]
         strh r1, [r0, #0x1c]
         mov r1, #0x6
         strh r1, [r0, #0x2e]
         bl DrawBackground-0x4
         ldr r0, [pc, #0x14] # REFERENCE_.L160
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x24] # REFERENCE_.L174
         str r0, [r1, #0x8]
         add sp, #0x4
         pop {r3}
         mov r8, r3
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word gCurTask
         .word 0x3000074
```

## `sub_80885CC`

```c
void sub_80885CC() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x8
         ldr r0, [pc, #0x74] # REFERENCE_.L84
         ldr r0, [r0, #0x0]
         ldrh r2, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r2, r0
         mov r6, #0x0
         ldrb r1, [r4, #0x0]
         neg r0, r1
         orr r0, r1
         lsr r0, #0x1f
         mov r8, r0
         ldr r5, [r4, #0x7c]
         mov r0, #0xaa
         lsl r0, #0x8
         str r0, [r4, #0x38]
         str r0, [r4, #0x40]
         mov r0, #0xa0
         lsl r0, #0x7
         str r0, [r4, #0x58]
         mov r1, #0x1
         strb r1, [r4, #0x6]
         ldr r0, [pc, #0x4c] # REFERENCE_.L88
         add r2, r0
         mov r0, #0xc0
         lsl r0, #0x1
         strh r0, [r2, #0x0]
         strb r1, [r4, #0x3]
         ldrh r0, [r4, #0x10]
         strb r0, [r4, #0xc]
         mov r0, #0x2
         strh r0, [r4, #0x10]
         mov r0, #0xc8
         lsl r0, #0x7
         str r0, [r4, #0x3c]
         mov r0, #0x82
         lsl r0, #0x8
         str r0, [r4, #0x44]
         ldr r1, [pc, #0x30] # REFERENCE_.L8c
         mov r10, r1
         mov r0, #0x0
         mov r9, r0
         mov r7, #0x0
         mov r1, r8
         lsl r1, #0x1
         str r1, [sp, #0x4]
     104lsl r0, r6, #0x2
         add r0, r6
         lsl r0, #0x3
         mov r1, #0xde
         lsl r1, #0x1
         add r0, r1
         add r2, r4, r0
         str r5, [r2, #0x0]
         cmp r6, #0x0
         bne .L9069
         mov r0, #0x80
         lsl r0, #0x4
         add r5, r0
         b .L9672
         .word gCurTask
         .word 0x3000074
         .word gUnknown_080D6654
     61mov r1, #0x80
         lsl r1, #0x4
         add r5, r1
     65mov r1, r8
         lsl r0, r1, #0x1
         add r0, r6, r0
         lsl r0, #0x3
         add r0, r10
         ldrh r1, [r0, #0x0]
         strh r1, [r2, #0xc]
         ldrb r0, [r0, #0x2]
         strb r0, [r2, #0x1a]
         mov r0, #0xff
         strb r0, [r2, #0x1b]
         ldr r0, [r4, #0x38]
         asr r0, #0x8
         strh r0, [r2, #0x10]
         ldr r0, [r4, #0x3c]
         asr r0, #0x8
         strh r0, [r2, #0x12]
         mov r0, #0xc0
         strh r0, [r2, #0x14]
         strh r7, [r2, #0xe]
         strh r7, [r2, #0x16]
         mov r0, #0x10
         strb r0, [r2, #0x1c]
         mov r0, r9
         strb r0, [r2, #0x1f]
         str r7, [r2, #0x8]
         mov r0, r2
         bl UpdateSpriteAnimation-0x4
         add r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
         cmp r6, #0x1
         bls .L6852
         mov r6, #0x0
         mov r1, #0xd
         add r1, r4
         mov r8, r1
         ldr r0, [pc, #0x24] # REFERENCE_.L108
         mov r10, r0
         mov r1, #0x0
         mov r9, r1
         mov r7, #0x0
     163lsl r0, r6, #0x2
         add r0, r6
         lsl r0, #0x3
         mov r1, #0x83
         lsl r1, #0x2
         add r0, r1
         add r2, r4, r0
         str r5, [r2, #0x0]
         cmp r6, #0x0
         bne .L10c129
         mov r0, #0x80
         lsl r0, #0x4
         add r5, r0
         b .L112132
         .word gUnknown_080D6674
     123mov r1, #0x80
         lsl r1, #0x4
         add r5, r1
     127ldr r1, [sp, #0x4]
         add r0, r6, r1
         lsl r0, #0x3
         add r0, r10
         ldrh r1, [r0, #0x0]
         strh r1, [r2, #0xc]
         ldrb r0, [r0, #0x2]
         strb r0, [r2, #0x1a]
         mov r0, #0xff
         strb r0, [r2, #0x1b]
         ldr r0, [r4, #0x40]
         asr r0, #0x8
         strh r0, [r2, #0x10]
         ldr r0, [r4, #0x44]
         asr r0, #0x8
         strh r0, [r2, #0x12]
         mov r0, #0xc0
         strh r0, [r2, #0x14]
         strh r7, [r2, #0xe]
         strh r7, [r2, #0x16]
         mov r0, #0x10
         strb r0, [r2, #0x1c]
         mov r0, r9
         strb r0, [r2, #0x1f]
         str r7, [r2, #0x8]
         mov r0, r2
         bl UpdateSpriteAnimation-0x4
         add r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
         cmp r6, #0x1
         bls .Lec114
         mov r0, #0x0
         strb r0, [r4, #0xd]
         mov r0, #0x22
         str r0, [sp, #0x0]
         mov r0, #0x1
         mov r1, r8
         mov r2, r5
         mov r3, #0x58
         bl sub_808A1B0-0x4
         mov r0, #0x2
         strb r0, [r4, #0xb]
         mov r1, #0xdc
         lsl r1, #0x2
         add r0, r4, r1
         ldr r1, [pc, #0x24] # REFERENCE_.L198
         ldrh r1, [r1, #0x4]
         strh r1, [r0, #0x1c]
         mov r1, #0x6
         strh r1, [r0, #0x2e]
         bl DrawBackground-0x4
         ldr r0, [pc, #0x18] # REFERENCE_.L19c
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.L1a0
         str r0, [r1, #0x8]
         add sp, #0x8
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
```

## `sub_8048D98`

```c
void sub_8048D98(PandaCart *cart)
{
    u8 sp00[4][2];
    u8 i;
    void *tiles;

    memcpy(sp00, gUnknown_080D03C0, sizeof(sp00));

    for (i = 0; i < 8; i++) {
        cart->qUnk58[i].x = 0;
        cart->qUnk58[i].y = 0;
        cart->qUnk78[i].x = cart->qWorldX;
        cart->qUnk78[i].y = cart->qWorldY;
    }

    tiles = cart->s.tiles;

    for (i = 0; i < (s32)ARRAY_COUNT(cart->sprB8); i++) {
        Sprite *s = &cart->sprB8[i];

        s->tiles = tiles;
        s->anim = ANIM_ROCKET;
        s->variant = sp00[i][0];
        s->oamFlags = SPRITE_OAM_ORDER(8);
        s->animCursor = 0;
        s->qAnimDelay = 0;
        s->prevVariant = -1;
        s->animSpeed = SPRITE_ANIM_SPEED(1.0);
        s->palId = 0;
        s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
        s->frameFlags = SPRITE_FLAG(PRIORITY, 0);

        s->x = I(cart->qWorldX) - gCamera.x;
        s->y = I(cart->qWorldY) - gCamera.y;
        UpdateSpriteAnimation(s);

        tiles += sp00[i][1] * TILE_SIZE_4BPP;
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x8
         mov r5, r0
         ldr r1, [pc, #0xc0] # REFERENCE_.Ld0
         mov r0, sp
         mov r2, #0x8
         bl memcpy-0x4
         mov r6, #0x0
         mov r0, #0x1
         add r0, sp, r0
         mov r9, r0
         mov r3, #0x0
         mov r7, r5
         add r7, #0x78
         mov r4, r5
         add r4, #0x7c
     38lsl r0, r6, #0x2
         add r0, r5, r0
         mov r1, r0
         add r1, #0x58
         strh r3, [r1, #0x0]
         add r0, #0x5a
         strh r3, [r0, #0x0]
         lsl r1, r6, #0x3
         add r2, r7, r1
         ldr r0, [r5, #0x3c]
         str r0, [r2, #0x0]
         add r1, r4, r1
         ldr r0, [r5, #0x40]
         str r0, [r1, #0x0]
         add r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
         cmp r6, #0x7
         bls .L2a20
         ldr r7, [r5, #0xc]
         mov r6, #0x0
         mov r8, r6
         ldr r1, [pc, #0x7c] # REFERENCE_.Ld4
         mov r10, r1
     93lsl r0, r6, #0x2
         add r0, r6
         lsl r0, #0x3
         add r0, #0xb8
         add r0, r5, r0
         str r7, [r0, #0x0]
         mov r2, r10
         strh r2, [r0, #0xc]
         lsl r4, r6, #0x1
         mov r2, sp
         add r1, r2, r4
         ldrb r1, [r1, #0x0]
         strb r1, [r0, #0x1a]
         mov r1, #0x80
         lsl r1, #0x2
         strh r1, [r0, #0x14]
         mov r1, r8
         strh r1, [r0, #0xe]
         strh r1, [r0, #0x16]
         mov r1, #0xff
         strb r1, [r0, #0x1b]
         mov r1, #0x10
         strb r1, [r0, #0x1c]
         mov r2, #0x0
         strb r2, [r0, #0x1f]
         sub r1, #0x11
         str r1, [r0, #0x20]
         mov r1, r8
         str r1, [r0, #0x8]
         ldr r2, [r5, #0x3c]
         asr r2, #0x8
         ldr r3, [pc, #0x3c] # REFERENCE_.Ld8
         ldr r1, [r3, #0x0]
         sub r2, r1
         strh r2, [r0, #0x10]
         ldr r1, [r5, #0x40]
         asr r1, #0x8
         ldr r2, [r3, #0x4]
         sub r1, r2
         strh r1, [r0, #0x12]
         bl UpdateSpriteAnimation-0x4
         add r4, r9
         ldrb r0, [r4, #0x0]
         lsl r0, #0x5
         add r7, r0
         add r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
         cmp r6, #0x2
         bls .L5a44
         add sp, #0x8
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gUnknown_080D03C0
         .word 0x393
         .word gCamera
```

## `Task_803CF84`

```c
void Task_803CF84(void)
{
    s8 r6 = 0;
    BonusGameUI *ui = TASK_DATA(gCurTask);
    u8 arr[ARRAY_COUNT(sBonusLifeIconVariants)];
    Player *p;
    Sprite *s;
    u8 i;

    for (i = 0; i < NUM_SINGLE_PLAYER_CHARS; i++) {
        p = GET_SP_PLAYER_V1(i);

        p->moveState |= MOVESTATE_IGNORE_INPUT;
    }

    if ((gStageData.playerIndex == 0) && (ui->unk17 >= 96)) {
        s = &ui->sprCountdownDigit;

        if (!(gUnknown_03001D00 < 8)) {
            s->anim = gUnknown_080CF770[1].anim;
            s->variant = gUnknown_080CF770[1].variant;
            s->prevVariant = -1;

            s->y = 60;
            sub_803D4C8();

            ui->unk12 = 100;
            memcpy(arr, sBonusLifeIconVariants, sizeof(arr));
            {
                void *tiles = (OBJ_VRAM0 + 0x2800);
                Player *p1 = &gPlayers[gStageData.playerIndex];
                Player *p2 = &gPlayers[p1->charFlags.partnerIndex];
                s32 r4;

                s = &ui->sprPlayer1Icon;
                s->tiles = tiles;
                tiles += MAX_TILES(ANIM_LIFE_ICONS) * TILE_SIZE_4BPP;
                s->anim = ANIM_LIFE_ICONS;
                s->variant = arr[p1->charFlags.character];
                s->oamFlags = SPRITE_OAM_ORDER(0);
                s->animCursor = 0;
                s->qAnimDelay = Q(0);
                s->prevVariant = -1;
                s->animSpeed = SPRITE_ANIM_SPEED(1.0);
                s->palId = 0;
                s->hitboxes[0].index = -1;
                s->frameFlags = SPRITE_FLAG(PRIORITY, 0);
                s->x = LIFE_ICON_P1_X;
                s->y = LIFE_ICON_P1_Y;
                UpdateSpriteAnimation(s);

                s = &ui->sprPlayer2Icon;
                s->tiles = tiles;
                tiles += MAX_TILES(ANIM_LIFE_ICONS) * TILE_SIZE_4BPP;
                s->anim = ANIM_LIFE_ICONS;
                s->variant = arr[p2->charFlags.character];
                s->oamFlags = SPRITE_OAM_ORDER(1);
                s->animCursor = 0;
                s->qAnimDelay = Q(0);
                s->prevVariant = -1;
                s->animSpeed = SPRITE_ANIM_SPEED(1.0);
                s->palId = 0;
                s->hitboxes[0].index = -1;
                s->frameFlags = SPRITE_FLAG(PRIORITY, 0);
                s->x = LIFE_ICON_P2_X;
                s->y = LIFE_ICON_P2_Y;
                UpdateSpriteAnimation(s);

                s = &ui->spr518;
                s->tiles = tiles;
                tiles += MAX_TILES_VARIANT(ANIM_BONUS_UI_X, 1) * TILE_SIZE_4BPP;
                s->anim = ANIM_BONUS_UI_X;
                s->variant = 1;
                s->oamFlags = SPRITE_OAM_ORDER(2);
                s->animCursor = 0;
                s->qAnimDelay = Q(0);
                s->prevVariant = -1;
                s->animSpeed = SPRITE_ANIM_SPEED(1.0);
                s->palId = 0;
                s->hitboxes[0].index = -1;
                s->frameFlags = SPRITE_FLAG(PRIORITY, 0);
                s->x = LIFE_BACKDROP_X;
                s->y = LIFE_BACKDROP_Y;
                UpdateSpriteAnimation(s);

                s = &ui->spr540;
                s->tiles = tiles;
                tiles += MAX_TILES_VARIANT(ANIM_BONUS_UI_X, 0) * TILE_SIZE_4BPP;
                s->anim = ANIM_BONUS_UI_X;
                s->variant = 0;
                s->oamFlags = SPRITE_OAM_ORDER(1);
                s->animCursor = 0;
                s->qAnimDelay = Q(0);
                s->prevVariant = -1;
                s->animSpeed = SPRITE_ANIM_SPEED(1.0);
                s->palId = 0;
                s->hitboxes[0].index = -1;
                s->frameFlags = SPRITE_FLAG(PRIORITY, 0);
                s->x = LIFE_COUNT_X_X;
                s->y = LIFE_COUNT_X_Y;
                UpdateSpriteAnimation(s);

                if (ui->timer >= 1500) {
                    r4 = 5;
                } else if (ui->timer >= 600) {
                    r4 = 2;
                } else {
                    r4 = 1;
                }

                // Lives counter?
                s = &ui->spr568;
                s->tiles = tiles;
                s->anim = ANIM_BONUS_UI_TIMER_DIGITS;
                s->variant = 0;
                s->oamFlags = SPRITE_OAM_ORDER(1);
                s->animCursor = 0;
                s->qAnimDelay = Q(0);
                s->prevVariant = -1;
                s->animSpeed = SPRITE_ANIM_SPEED(1.0);
                s->palId = 0;
                s->hitboxes[0].index = -1;
                s->frameFlags = SPRITE_FLAG(PRIORITY, 0);
                s->x = EXTRALIFE_COUNTER_X;
                s->y = EXTRALIFE_COUNTER_Y;
                UpdateSpriteAnimation(s);

                sub_8003DC4(r4);
                ui->unk14 = r4;
            }

            gCurTask->main = Task_803D324;
            gStageData.unk4 = 6;
            return;
        } else {
            s->anim = gUnknown_080CF770[2].anim;
            s->variant = gUnknown_080CF770[2].variant;
            s->prevVariant = -1;
        }
    }

    if (--ui->unk17 == 0) {
        ui->unk17 = 128;

        gCurTask->main = Task_803D248;
    }

    sub_803D4C8();
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         sub sp, #0x8
         ldr r2, [pc, #0x20] # REFERENCE_.L30
         ldr r0, [r2, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r6, r1, r0
         mov r4, #0x0
         ldr r0, [pc, #0x18] # REFERENCE_.L34
         mov r8, r0
         ldr r5, [pc, #0x18] # REFERENCE_.L38
     44cmp r4, #0x0
         beq .L3c27
         mov r0, r3
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         b .L4029
         .word gCurTask
         .word gStageData
         .word gPlayers
     17mov r0, r8
         ldrb r1, [r0, #0x6]
     23lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         add r3, r0, r5
         ldr r0, [r3, #0x4]
         mov r1, #0x80
         lsl r1, #0x14
         orr r0, r1
         str r0, [r3, #0x4]
         add r0, r4, #0x1
         lsl r0, #0x18
         lsr r4, r0, #0x18
         cmp r4, #0x1
         bls .L2016
         mov r1, r8
         ldrb r7, [r1, #0x6]
         cmp r7, #0x0
         beq .L6a50
         b .L292305
     48ldrb r0, [r6, #0x17]
         cmp r0, #0x5f
         bhi .L7254
         b .L292305
     52mov r0, #0xd8
         lsl r0, #0x2
         add r3, r6, r0
         ldr r0, [pc, #0x178] # REFERENCE_.L1f4
         ldrb r0, [r0, #0x0]
         cmp r0, #0x7
         bhi .L8262
         b .L284298
     60ldr r1, [pc, #0x174] # REFERENCE_.L1f8
         ldrh r0, [r1, #0xc]
         strh r0, [r3, #0xc]
         ldrb r0, [r1, #0xe]
         strb r0, [r3, #0x1a]
         mov r0, #0xff
         strb r0, [r3, #0x1b]
         mov r0, #0x3c
         strh r0, [r3, #0x12]
         bl sub_803D4C8-0x4
         mov r0, #0x64
         strh r0, [r6, #0x12]
         ldr r1, [pc, #0x15c] # REFERENCE_.L1fc
         mov r0, sp
         mov r2, #0x5
         bl memcpy-0x4
         ldr r1, [pc, #0x158] # REFERENCE_.L200
         mov r10, r1
         mov r1, r8
         ldrb r0, [r1, #0x6]
         lsl r1, r0, #0x2
         add r1, r0
         lsl r1, #0x2
         add r1, r0
         lsl r1, #0x4
         ldr r2, [pc, #0x148] # REFERENCE_.L204
         add r1, r2
         mov r0, r1
         add r0, #0x2b
         ldrb r0, [r0, #0x0]
         lsl r0, #0x1e
         lsr r0, #0x1e
         lsl r4, r0, #0x2
         add r4, r0
         lsl r4, #0x2
         add r4, r0
         lsl r4, #0x4
         add r4, r2
         mov r0, #0x99
         lsl r0, #0x3
         add r3, r6, r0
         mov r0, r10
         str r0, [r3, #0x0]
         mov r0, #0x80
         add r10, r0
         ldr r0, [pc, #0x124] # REFERENCE_.L208
         mov r9, r0
         mov r0, r9
         strh r0, [r3, #0xc]
         add r1, #0x2a
         ldrb r0, [r1, #0x0]
         lsl r0, #0x1c
         lsr r0, #0x1c
         add r0, sp, r0
         ldrb r0, [r0, #0x0]
         strb r0, [r3, #0x1a]
         strh r7, [r3, #0x14]
         strh r7, [r3, #0xe]
         strh r7, [r3, #0x16]
         mov r0, #0x1
         neg r0, r0
         strb r0, [r3, #0x1b]
         mov r1, #0x10
         strb r1, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         mov r5, #0x1
         neg r5, r5
         str r5, [r3, #0x20]
         str r7, [r3, #0x8]
         mov r0, #0x5f
         strh r0, [r3, #0x10]
         mov r1, #0x4e
         mov r8, r1
         mov r0, r8
         strh r0, [r3, #0x12]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         mov r1, #0x9e
         lsl r1, #0x3
         add r3, r6, r1
         mov r0, r10
         str r0, [r3, #0x0]
         mov r1, #0x80
         add r10, r1
         mov r0, r9
         strh r0, [r3, #0xc]
         add r4, #0x2a
         ldrb r0, [r4, #0x0]
         lsl r0, #0x1c
         lsr r0, #0x1c
         add r0, sp, r0
         ldrb r0, [r0, #0x0]
         strb r0, [r3, #0x1a]
         mov r1, #0x40
         mov r9, r1
         mov r0, r9
         strh r0, [r3, #0x14]
         strh r7, [r3, #0xe]
         strh r7, [r3, #0x16]
         mov r0, r5
         strb r0, [r3, #0x1b]
         mov r1, #0x10
         strb r1, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         str r5, [r3, #0x20]
         str r7, [r3, #0x8]
         mov r0, #0x69
         strh r0, [r3, #0x10]
         mov r1, r8
         strh r1, [r3, #0x12]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         mov r0, #0xa3
         lsl r0, #0x3
         add r3, r6, r0
         mov r1, r10
         str r1, [r3, #0x0]
         mov r0, #0xc0
         lsl r0, #0x2
         add r10, r0
         ldr r4, [pc, #0x8c] # REFERENCE_.L20c
         strh r4, [r3, #0xc]
         mov r0, #0x1
         strb r0, [r3, #0x1a]
         mov r0, #0x80
         strh r0, [r3, #0x14]
         strh r7, [r3, #0xe]
         strh r7, [r3, #0x16]
         mov r0, r5
         strb r0, [r3, #0x1b]
         mov r1, #0x10
         strb r1, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         str r5, [r3, #0x20]
         str r7, [r3, #0x8]
         mov r0, #0x6c
         strh r0, [r3, #0x10]
         mov r0, #0x55
         strh r0, [r3, #0x12]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         mov r1, #0xa8
         lsl r1, #0x3
         add r3, r6, r1
         mov r0, r10
         str r0, [r3, #0x0]
         mov r1, #0x80
         add r10, r1
         strh r4, [r3, #0xc]
         mov r0, #0x0
         strb r0, [r3, #0x1a]
         mov r1, r9
         strh r1, [r3, #0x14]
         strh r7, [r3, #0xe]
         strh r7, [r3, #0x16]
         mov r0, r5
         strb r0, [r3, #0x1b]
         mov r0, #0x10
         strb r0, [r3, #0x1c]
         mov r1, #0x0
         strb r1, [r3, #0x1f]
         str r5, [r3, #0x20]
         str r7, [r3, #0x8]
         mov r0, #0x8a
         strh r0, [r3, #0x10]
         mov r0, #0x56
         strh r0, [r3, #0x12]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         mov r0, #0x10
         ldrsh r1, [r6, r0]
         ldr r0, [pc, #0x24] # REFERENCE_.L210
         cmp r1, r0
         ble .L214249
         mov r4, #0x5
         b .L21e254
         .word gUnknown_03001D00
         .word gUnknown_080CF770
         .word sBonusLifeIconVariants
         .word 0x6012800
         .word gPlayers
         .word 0x58f
         .word 0x48d
         .word 0x5db
     238ldr r0, [pc, #0x58] # REFERENCE_.L270
         mov r4, #0x1
         cmp r1, r0
         ble .L21e254
         mov r4, #0x2
     240mov r1, #0xad
         lsl r1, #0x3
         add r3, r6, r1
         mov r0, r10
         str r0, [r3, #0x0]
         mov r2, #0x0
         mov r1, #0x0
         ldr r0, [pc, #0x44] # REFERENCE_.L274
         strh r0, [r3, #0xc]
         strb r2, [r3, #0x1a]
         mov r0, #0x40
         strh r0, [r3, #0x14]
         strh r1, [r3, #0xe]
         strh r1, [r3, #0x16]
         mov r0, #0xff
         strb r0, [r3, #0x1b]
         mov r0, #0x10
         strb r0, [r3, #0x1c]
         strb r2, [r3, #0x1f]
         sub r0, #0x11
         str r0, [r3, #0x20]
         str r1, [r3, #0x8]
         mov r0, #0x96
         strh r0, [r3, #0x10]
         mov r0, #0x55
         strh r0, [r3, #0x12]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         mov r0, r4
         bl sub_8003DC4-0x4
         strb r4, [r6, #0x14]
         ldr r0, [pc, #0x14] # REFERENCE_.L278
         ldr r1, [r0, #0x0]
         ldr r0, [pc, #0x14] # REFERENCE_.L27c
         str r0, [r1, #0x8]
         ldr r1, [pc, #0x14] # REFERENCE_.L280
         mov r0, #0x6
         strb r0, [r1, #0x4]
         b .L2ac317
         .word 0x257
         .word 0x487
         .word gCurTask
         .word Task_803D324
         .word gStageData
     61ldr r1, [pc, #0x34] # REFERENCE_.L2bc
         ldrh r0, [r1, #0x14]
         strh r0, [r3, #0xc]
         ldrb r0, [r1, #0x16]
         strb r0, [r3, #0x1a]
         mov r0, #0xff
         strb r0, [r3, #0x1b]
     49ldrb r0, [r6, #0x17]
         sub r0, #0x1
         strb r0, [r6, #0x17]
         lsl r0, #0x18
         cmp r0, #0x0
         bne .L2a8316
         mov r0, #0x80
         strb r0, [r6, #0x17]
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.L2c0
         str r0, [r1, #0x8]
     310bl sub_803D4C8-0x4
     292add sp, #0x8
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gUnknown_080CF770
         .word Task_803D248
```

# Functions that call the target assembly

## `CreateBoss_806D1A0`

```c
void CreateBoss_806D1A0() { }
```

```asm
         push {r4, r5, r6, r7, lr}
         sub sp, #0x4
         mov r5, r0
         mov r4, r1
         ldr r0, [pc, #0x4c] # REFERENCE_.L58
         mov r1, #0xdc
         lsl r1, #0x3
         mov r2, #0x84
         lsl r2, #0x6
         ldr r3, [pc, #0x48] # REFERENCE_.L5c
         str r3, [sp, #0x0]
         mov r3, #0x0
         bl TaskCreate-0x4
         mov r7, r0
         ldrh r2, [r7, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r6, r2, r0
         ldr r1, [pc, #0x38] # REFERENCE_.L60
         mov r0, r1
         add r0, #0x88
         str r7, [r0, #0x0]
         lsl r4, #0x8
         str r4, [r6, #0x0]
         ldr r0, [pc, #0x30] # REFERENCE_.L64
         str r0, [r6, #0x4]
         ldr r0, [pc, #0x30] # REFERENCE_.L68
         str r0, [r6, #0x40]
         mov r3, #0xa8
         lsl r3, #0x1
         add r0, r3
         str r0, [r6, #0x44]
         mov r0, #0x0
         str r0, [r6, #0x8]
         str r0, [r6, #0xc]
         str r5, [r6, #0x2c]
         ldrb r0, [r1, #0x1]
         cmp r0, #0x0
         bne .L7049
         ldr r0, [pc, #0x18] # REFERENCE_.L6c
         add r1, r2, r0
         mov r0, #0x8
         b .L7652
         .word sub_806E910
         .word sub_806EA14
         .word gStageData
         .word 0xffff3800
         .word gPlayers
         .word 0x3000030
     38ldr r3, [pc, #0x50] # REFERENCE_.Lc4
         add r1, r2, r3
         mov r0, #0x6
     42strb r0, [r1, #0x0]
         mov r0, #0x90
         lsl r0, #0x7
         str r0, [r6, #0x10]
         mov r2, #0x0
         mov r1, #0x0
         strh r1, [r6, #0x32]
         mov r3, r6
         add r3, #0x27
         mov r0, #0x1
         strb r0, [r3, #0x0]
         mov r0, r6
         add r0, #0x28
         strb r2, [r0, #0x0]
         str r1, [r6, #0x18]
         str r1, [r6, #0x1c]
         strh r1, [r6, #0x20]
         sub r0, #0x4
         strb r2, [r0, #0x0]
         add r0, #0x1
         strb r2, [r0, #0x0]
         mov r0, #0x7c
         bl VramMalloc-0x4
         str r0, [r6, #0x38]
         mov r0, #0x74
         bl VramMalloc-0x4
         str r0, [r6, #0x3c]
         mov r0, r6
         bl sub_806D404-0x4
         bl sub_807A4BC-0x4
         mov r0, r7
         add sp, #0x4
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
         .word 0x3000030
```

# Declarations for the functions called from the target assembly

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
	thumb_func_start sub_806D404
sub_806D404: @ 0x0806D404
	push {r4, r5, r6, r7, lr}
	mov r7, sl
	mov r6, sb
	mov r5, r8
	push {r5, r6, r7}
	sub sp, #4
	adds r6, r0, #0
	ldr r0, [r6, #0x38]
	mov r8, r0
	movs r7, #0
	movs r1, #0
	mov sb, r1
	movs r3, #0x80
	lsls r3, r3, #5
	mov sl, r3
_0806D422:
	lsls r4, r7, #3
	subs r2, r4, r7
	lsls r2, r2, #3
	adds r3, r2, #0
	adds r3, #0x48
	adds r3, r6, r3
	adds r5, r3, #0
	adds r5, #8
	adds r0, r6, #0
	adds r0, #0x48
	adds r0, r0, r2
	ldr r1, [r6]
	str r1, [r0]
	adds r0, r6, #0
	adds r0, #0x4c
	adds r0, r0, r2
	ldr r1, [r6, #4]
	str r1, [r0]
	mov r0, r8
	str r0, [r3, #8]
	ldr r0, _0806D55C @ =gUnknown_080D57CC
	adds r4, r4, r0
	ldrb r0, [r4, #3]
	adds r0, #2
	lsls r0, r0, #6
	strh r0, [r5, #0x14]
	ldrh r0, [r4]
	strh r0, [r5, #0xc]
	ldrb r0, [r4, #2]
	strb r0, [r5, #0x1a]
	mov r1, sb
	strh r1, [r5, #0x16]
	movs r0, #0xff
	strb r0, [r5, #0x1b]
	movs r0, #0x10
	strb r0, [r5, #0x1c]
	movs r3, #0
	strb r3, [r5, #0x1f]
	strh r1, [r5, #0x10]
	strh r1, [r5, #0x12]
	mov r0, sl
	str r0, [r5, #8]
	ldrb r0, [r4, #4]
	cmp r0, #0
	bne _0806D486
	movs r0, #0x80
	lsls r0, r0, #0xc
	mov r1, sl
	orrs r0, r1
	str r0, [r5, #8]
_0806D486:
	ldrb r0, [r4, #5]
	cmp r0, #0
	beq _0806D496
	ldr r0, [r5, #8]
	movs r1, #0x80
	lsls r1, r1, #3
	orrs r0, r1
	str r0, [r5, #8]
_0806D496:
	adds r0, r5, #0
	bl UpdateSpriteAnimation
	ldrb r0, [r4, #6]
	lsls r0, r0, #5
	add r8, r0
	adds r0, r7, #1
	lsls r0, r0, #0x18
	lsrs r7, r0, #0x18
	cmp r7, #0xf
	bls _0806D422
	ldr r3, [r6, #0x3c]
	mov r8, r3
	movs r7, #0
	movs r4, #0
	movs r0, #0x8f
	lsls r0, r0, #3
	mov sb, r0
	adds r1, r6, #0
	add r1, sb
	mov sl, r1
_0806D4C0:
	lsls r2, r7, #3
	movs r3, #0xf2
	lsls r3, r3, #2
	adds r0, r6, r3
	adds r0, r0, r2
	str r4, [r0]
	adds r1, r6, r2
	adds r3, #4
	adds r0, r1, r3
	strb r4, [r0]
	adds r3, #1
	adds r0, r1, r3
	movs r3, #1
	strb r3, [r0]
	movs r3, #0x84
	lsls r3, r3, #3
	adds r0, r6, r3
	adds r0, r0, r2
	str r4, [r0]
	adds r3, #4
	adds r0, r1, r3
	strb r4, [r0]
	ldr r0, _0806D560 @ =0x00000425
	adds r1, r1, r0
	movs r3, #1
	strb r3, [r1]
	subs r2, r2, r7
	lsls r2, r2, #3
	mov r0, sb
	adds r1, r2, r0
	adds r1, r6, r1
	adds r5, r1, #0
	adds r5, #8
	mov r3, sl
	adds r0, r3, r2
	str r4, [r0]
	ldr r3, _0806D564 @ =0x0000047C
	adds r0, r6, r3
	adds r0, r0, r2
	str r4, [r0]
	mov r0, r8
	str r0, [r1, #8]
	movs r0, #0xa8
	lsls r0, r0, #3
	strh r0, [r5, #0x14]
	subs r0, #0x7b
	strh r0, [r5, #0xc]
	strb r4, [r5, #0x1a]
	strh r4, [r5, #0x16]
	movs r0, #0xff
	strb r0, [r5, #0x1b]
	movs r0, #0x10
	strb r0, [r5, #0x1c]
	strb r4, [r5, #0x1f]
	strh r4, [r5, #0x10]
	strh r4, [r5, #0x12]
	movs r0, #0x80
	lsls r0, r0, #5
	str r0, [r5, #8]
	adds r0, r5, #0
	bl UpdateSpriteAnimation
	movs r1, #0xa0
	add r8, r1
	adds r0, r7, #1
	lsls r0, r0, #0x18
	lsrs r7, r0, #0x18
	cmp r7, #0xa
	bls _0806D4C0
	add sp, #4
	pop {r3, r4, r5}
	mov r8, r3
	mov sb, r4
	mov sl, r5
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_0806D55C: .4byte gUnknown_080D57CC
_0806D560: .4byte 0x00000425
_0806D564: .4byte 0x0000047C
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
