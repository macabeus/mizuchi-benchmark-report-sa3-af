You are decompiling an assembly function called `sub_8087590` in ARMv4T from a Game Boy Advance game.

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

## `sub_803B498`

```c
// ShowSprites() ?
void sub_803B498(void)
{
    Capsule *cap = TASK_DATA(gCurTask);
    s32 seconds, minutes, secondsPerMinute, frames, timer;
    Sprite *s;
    u8 i;

    timer = cap->timer;
    seconds = Div(timer, GBA_FRAMES_PER_SECOND);
    minutes = Div(seconds, GBA_FRAMES_PER_SECOND);
    secondsPerMinute = sFrameCountPerSecond[minutes];
    seconds -= secondsPerMinute;
    frames = sFrameCountPerSecond[seconds];

    timer -= frames;
    timer -= gUnknown_080CFA28[minutes];

    s = &cap->sprTimer[ARRAY_COUNT(cap->sprTimer) - 1];

    s->x = 128;
    s->y = 22;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);

    s = &cap->sprTimer[gUnknown_080CF936[timer][0]];
    s->x = 134;
    s->y = 18;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);

    s = &cap->sprTimer[gUnknown_080CF936[timer][1]];
    s->x = 140;
    s->y = 18;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);

    if (gUnknown_080CF8BC[seconds][0]) {
        s = &cap->sprTimer[gUnknown_080CF8BC[seconds][0]];
        s->x = 112;
        s->y = 14;
        UpdateSpriteAnimation(s);
        DisplaySprite(s);
    }

    s = &cap->sprTimer[gUnknown_080CF8BC[seconds][1]];
    s->x = 120;
    s->y = 14;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);

    s = &cap->s2;
    s->x = 200;
    s->y = 14;
    UpdateSpriteAnimation(s);
    DisplaySprite(s);

    if (cap->unk12 < cap->unk10 && (--cap->unk13 == 0)) {
        cap->unk13 = 8;
        cap->unk12++;
    }

    for (i = 0; i < 2; i++) {
        u8 r0;
        s8 sb;
        s32 r4 = (i != 0) ? cap->unk11 : cap->unk12;
        s32 tens, ones;

        if (r4 > 99) {
            r4 = 99;
        }

        r0 = ((i == 0) && (cap->unk13 != 8)) ? cap->unk13 >> 1 : 0;

        sb = r0;

        tens = r4 / 10;

        r4 -= tens * 10;

        if (tens != 0) {
            s = &cap->sprTimer[tens];
            s->x = (i != 0) ? 210 : 180;
            s->y = ((i != 0) ? 17 : 11) - sb;
            UpdateSpriteAnimation(s);
            DisplaySprite(s);
        }

        s = &cap->sprTimer[r4];
        if ((tens == 0) && (i != 0)) {
            s->x = 210;
        } else {
            s->x = (i != 0) ? 220 : 190;
        }
        s->y = ((i != 0) ? 17 : 11) - sb;
        UpdateSpriteAnimation(s);
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
         ldr r0, [pc, #0x158] # REFERENCE_.L164
         ldr r0, [r0, #0x0]
         ldrh r0, [r0, #0x6]
         mov r10, r0
         mov r0, #0xc0
         lsl r0, #0x12
         add r0, r10
         mov r8, r0
         mov r1, #0x16
         ldrsh r5, [r0, r1]
         mov r0, r5
         mov r1, #0x3c
         bl Div-0x4
         mov r4, r0
         mov r1, #0x3c
         bl Div-0x4
         ldr r2, [pc, #0x138] # REFERENCE_.L168
         lsl r0, #0x1
         add r1, r0, r2
         mov r3, #0x0
         ldrsh r1, [r1, r3]
         sub r4, r1
         lsl r4, #0x1
         mov r9, r4
         add r2, r9
         mov r3, #0x0
         ldrsh r1, [r2, r3]
         sub r5, r1
         ldr r1, [pc, #0x124] # REFERENCE_.L16c
         add r0, r1
         ldrh r0, [r0, #0x0]
         sub r5, r0
         ldr r7, [pc, #0x120] # REFERENCE_.L170
         add r7, r10
         mov r0, #0x80
         strh r0, [r7, #0x10]
         mov r0, #0x16
         strh r0, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         ldr r4, [pc, #0x10c] # REFERENCE_.L174
         lsl r5, #0x1
         add r0, r5, r4
         ldrb r1, [r0, #0x0]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r1, #0x86
         lsl r1, #0x2
         add r0, r1
         mov r3, r8
         add r7, r3, r0
         mov r0, #0x86
         strh r0, [r7, #0x10]
         mov r6, #0x12
         strh r6, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         add r4, #0x1
         add r5, r4
         ldrb r1, [r5, #0x0]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r1, #0x86
         lsl r1, #0x2
         add r0, r1
         mov r3, r8
         add r7, r3, r0
         mov r0, #0x8c
         strh r0, [r7, #0x10]
         strh r6, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         ldr r4, [pc, #0xbc] # REFERENCE_.L178
         mov r0, r9
         add r1, r0, r4
         ldrb r0, [r1, #0x0]
         cmp r0, #0x0
         beq .Lec108
         mov r1, r0
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r1, #0x86
         lsl r1, #0x2
         add r0, r1
         mov r3, r8
         add r7, r3, r0
         mov r0, #0x70
         strh r0, [r7, #0x10]
         mov r0, #0xe
         strh r0, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
     90add r0, r4, #0x1
         add r0, r9
         ldrb r1, [r0, #0x0]
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x3
         mov r1, #0x86
         lsl r1, #0x2
         add r0, r1
         mov r3, r8
         add r7, r3, r0
         mov r0, #0x78
         strh r0, [r7, #0x10]
         mov r4, #0xe
         strh r4, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         ldr r7, [pc, #0x64] # REFERENCE_.L17c
         add r7, r10
         mov r0, #0xc8
         strh r0, [r7, #0x10]
         strh r4, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         mov r0, r8
         ldrb r2, [r0, #0x12]
         mov r1, #0x12
         ldrsb r1, [r0, r1]
         ldrb r0, [r0, #0x10]
         lsl r0, #0x18
         asr r0, #0x18
         cmp r1, r0
         bge .L154156
         mov r1, r8
         ldrb r0, [r1, #0x13]
         sub r0, #0x1
         strb r0, [r1, #0x13]
         lsl r0, #0x18
         cmp r0, #0x0
         bne .L154156
         mov r0, #0x8
         strb r0, [r1, #0x13]
         add r0, r2, #0x1
         strb r0, [r1, #0x12]
     144mov r6, #0x0
     262cmp r6, #0x0
         beq .L180171
         mov r3, r8
         mov r4, #0x11
         ldrsb r4, [r3, r4]
         b .L186174
         .hword 0x0
         .word gCurTask
         .word sFrameCountPerSecond
         .word gUnknown_080CFA28
         .word 0x3000538
         .word gUnknown_080CF936
         .word gUnknown_080CF8BC
         .word 0x3000560
     158mov r0, r8
         mov r4, #0x12
         ldrsb r4, [r0, r4]
     162cmp r4, #0x63
         ble .L18c177
         mov r4, #0x63
     175cmp r6, #0x0
         bne .L1a2188
         mov r1, r8
         ldrb r0, [r1, #0x13]
         lsl r1, r0, #0x18
         cmp r0, #0x8
         beq .L1a2188
         asr r0, r1, #0x19
         lsl r0, #0x18
         lsr r0, #0x18
         b .L1a4189
     178mov r0, #0x0
     187mov r9, r0
         mov r0, r4
         mov r1, #0xa
         bl __divsi3-0x4
         mov r5, r0
         lsl r0, r5, #0x2
         add r1, r0, r5
         lsl r0, r1, #0x1
         sub r4, r0
         cmp r5, #0x0
         beq .L1f2225
         lsl r0, r1, #0x3
         mov r3, #0x86
         lsl r3, #0x2
         add r0, r3
         mov r1, r8
         add r7, r1, r0
         mov r0, #0xb4
         cmp r6, #0x0
         beq .L1d0210
         mov r0, #0xd2
     208strh r0, [r7, #0x10]
         mov r3, r9
         lsl r0, r3, #0x18
         asr r1, r0, #0x18
         cmp r6, #0x0
         beq .L1e0218
         mov r0, #0x11
         b .L1e2219
     215mov r0, #0xb
     217sub r0, r1
         strh r0, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
     199lsl r0, r4, #0x2
         add r0, r4
         lsl r0, #0x3
         mov r1, #0x86
         lsl r1, #0x2
         add r0, r1
         mov r3, r8
         add r7, r3, r0
         cmp r5, #0x0
         bne .L20e239
         cmp r6, #0x0
         beq .L20e239
         mov r0, #0xd2
         b .L216243
     234mov r0, #0xbe
         cmp r6, #0x0
         beq .L216243
         mov r0, #0xdc
     238strh r0, [r7, #0x10]
         mov r1, r9
         lsl r0, r1, #0x18
         asr r1, r0, #0x18
         cmp r6, #0x0
         beq .L226251
         mov r0, #0x11
         b .L228252
     248mov r0, #0xb
     250sub r0, r1
         strh r0, [r7, #0x12]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r7
         bl DisplaySprite-0x4
         add r0, r6, #0x1
         lsl r0, #0x18
         lsr r6, r0, #0x18
         cmp r6, #0x1
         bls .L156157
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
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

# Declarations for the functions called from the target assembly

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
	thumb_func_start sub_8087590
sub_8087590: @ 0x08087590
	push {r4, r5, r6, r7, lr}
	mov r7, r8
	push {r7}
	adds r4, r0, #0
	movs r5, #0
	ldr r7, _080877E0 @ =gUnknown_080D6114
	movs r0, #0
	mov r8, r0
	movs r6, #0
_080875A2:
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	adds r0, #0x7c
	adds r1, r4, r0
	ldr r0, [r4, #0x78]
	str r0, [r1]
	ldr r0, [r4, #0x78]
	movs r2, #0x80
	lsls r2, r2, #4
	adds r0, r0, r2
	str r0, [r4, #0x78]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrh r0, [r0]
	strh r0, [r1, #0xc]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrb r0, [r0, #2]
	strb r0, [r1, #0x1a]
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	ldr r0, [r4, #0x18]
	asrs r0, r0, #8
	strh r0, [r1, #0x10]
	ldr r0, [r4, #0x1c]
	asrs r0, r0, #8
	strh r0, [r1, #0x12]
	strh r6, [r1, #0x14]
	strh r6, [r1, #0xe]
	strh r6, [r1, #0x16]
	movs r0, #0x10
	strb r0, [r1, #0x1c]
	mov r0, r8
	strb r0, [r1, #0x1f]
	movs r0, #0x20
	str r0, [r1, #8]
	adds r0, r1, #0
	bl UpdateSpriteAnimation
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #1
	bls _080875A2
	movs r5, #0
	ldr r7, _080877E4 @ =gUnknown_080D6174
	movs r1, #0
	mov r8, r1
	movs r6, #0
_08087612:
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	adds r0, #0xcc
	adds r1, r4, r0
	ldr r0, [r4, #0x78]
	str r0, [r1]
	ldr r0, [r4, #0x78]
	movs r2, #0x80
	lsls r2, r2, #4
	adds r0, r0, r2
	str r0, [r4, #0x78]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrh r0, [r0]
	strh r0, [r1, #0xc]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrb r0, [r0, #2]
	strb r0, [r1, #0x1a]
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	ldr r0, [r4, #0x20]
	asrs r0, r0, #8
	strh r0, [r1, #0x10]
	ldr r0, [r4, #0x24]
	asrs r0, r0, #8
	strh r0, [r1, #0x12]
	movs r0, #0x40
	strh r0, [r1, #0x14]
	strh r6, [r1, #0xe]
	strh r6, [r1, #0x16]
	movs r0, #0x10
	strb r0, [r1, #0x1c]
	mov r0, r8
	strb r0, [r1, #0x1f]
	str r6, [r1, #8]
	adds r0, r1, #0
	bl UpdateSpriteAnimation
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #1
	bls _08087612
	movs r5, #0
	ldr r7, _080877E8 @ =gUnknown_080D61D4
	movs r1, #0
	mov r8, r1
	movs r6, #0
_08087682:
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	movs r2, #0x8e
	lsls r2, r2, #1
	adds r0, r0, r2
	adds r1, r4, r0
	ldr r0, [r4, #0x78]
	str r0, [r1]
	ldr r0, [r4, #0x78]
	movs r2, #0x80
	lsls r2, r2, #4
	adds r0, r0, r2
	str r0, [r4, #0x78]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrh r0, [r0]
	strh r0, [r1, #0xc]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrb r0, [r0, #2]
	strb r0, [r1, #0x1a]
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	ldr r0, [r4, #0x28]
	asrs r0, r0, #8
	strh r0, [r1, #0x10]
	ldr r0, [r4, #0x2c]
	asrs r0, r0, #8
	strh r0, [r1, #0x12]
	movs r0, #0x80
	strh r0, [r1, #0x14]
	strh r6, [r1, #0xe]
	strh r6, [r1, #0x16]
	movs r0, #0x10
	strb r0, [r1, #0x1c]
	mov r0, r8
	strb r0, [r1, #0x1f]
	str r6, [r1, #8]
	adds r0, r1, #0
	bl UpdateSpriteAnimation
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #1
	bls _08087682
	movs r5, #0
	ldr r7, _080877EC @ =gUnknown_080D6234
	movs r1, #0
	mov r8, r1
	movs r6, #0
_080876F6:
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	movs r2, #0xb6
	lsls r2, r2, #1
	adds r0, r0, r2
	adds r1, r4, r0
	ldr r0, [r4, #0x78]
	str r0, [r1]
	ldr r0, [r4, #0x78]
	movs r2, #0x80
	lsls r2, r2, #4
	adds r0, r0, r2
	str r0, [r4, #0x78]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrh r0, [r0]
	strh r0, [r1, #0xc]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrb r0, [r0, #2]
	strb r0, [r1, #0x1a]
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	ldr r0, [r4, #0x30]
	asrs r0, r0, #8
	strh r0, [r1, #0x10]
	ldr r0, [r4, #0x34]
	asrs r0, r0, #8
	strh r0, [r1, #0x12]
	movs r0, #0xc0
	strh r0, [r1, #0x14]
	strh r6, [r1, #0xe]
	strh r6, [r1, #0x16]
	movs r0, #0x10
	strb r0, [r1, #0x1c]
	mov r0, r8
	strb r0, [r1, #0x1f]
	str r6, [r1, #8]
	adds r0, r1, #0
	bl UpdateSpriteAnimation
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #1
	bls _080876F6
	movs r5, #0
	ldr r7, _080877F0 @ =gUnknown_080D6354
	movs r1, #0
	mov r8, r1
	movs r6, #0
_0808776A:
	lsls r0, r5, #2
	adds r0, r0, r5
	lsls r0, r0, #3
	movs r2, #0x97
	lsls r2, r2, #2
	adds r0, r0, r2
	adds r1, r4, r0
	ldr r0, [r4, #0x78]
	str r0, [r1]
	ldr r0, [r4, #0x78]
	movs r2, #0x80
	lsls r2, r2, #4
	adds r0, r0, r2
	str r0, [r4, #0x78]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrh r0, [r0]
	strh r0, [r1, #0xc]
	ldrb r0, [r4]
	lsls r0, r0, #1
	adds r0, r5, r0
	lsls r0, r0, #3
	adds r0, r0, r7
	ldrb r0, [r0, #2]
	strb r0, [r1, #0x1a]
	movs r0, #0xff
	strb r0, [r1, #0x1b]
	ldr r0, [r4, #0x48]
	asrs r0, r0, #8
	strh r0, [r1, #0x10]
	ldr r0, [r4, #0x4c]
	asrs r0, r0, #8
	strh r0, [r1, #0x12]
	movs r0, #0xc0
	strh r0, [r1, #0x14]
	strh r6, [r1, #0xe]
	strh r6, [r1, #0x16]
	movs r0, #0x10
	strb r0, [r1, #0x1c]
	mov r0, r8
	strb r0, [r1, #0x1f]
	str r6, [r1, #8]
	adds r0, r1, #0
	bl UpdateSpriteAnimation
	adds r0, r5, #1
	lsls r0, r0, #0x18
	lsrs r5, r0, #0x18
	cmp r5, #1
	bls _0808776A
	pop {r3}
	mov r8, r3
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_080877E0: .4byte gUnknown_080D6114
_080877E4: .4byte gUnknown_080D6174
_080877E8: .4byte gUnknown_080D61D4
_080877EC: .4byte gUnknown_080D6234
_080877F0: .4byte gUnknown_080D6354
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
