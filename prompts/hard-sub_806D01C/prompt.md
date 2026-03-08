You are decompiling an assembly function called `sub_806D01C` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_803B070`

```c
u32 sub_803B070(Capsule *cap)
{
    u32 switchId;
    CapSwitch *swit;
    Sprite *s;

    if ((cap->unkF == 0) || (--cap->unkF != 0)) {
        return 0xFF;
    }

    switchId = PseudoRandom32();
    switchId = (switchId >> 8) % 8u;

    switch (switchId) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4: {
            ;
        } break;

        case 5: {
            switchId = 0;
        } break;

        case 6: {
            switchId = 1;
        } break;

        case 7: {
            switchId = 2;
        } break;
    }

    swit = &cap->switches[switchId];
    s = &swit->s;
    s->prevVariant = -1;
    s->anim = ANIM_BONUS_CAPSULE_SWITCH;
    s->variant = (switchId == 0) ? 0 : 11;
    swit->unk4 = 0;
    swit->unk0 = 1;

    return switchId;
}
```

```asm
         push {lr}
         mov r3, r0
         ldrb r0, [r3, #0xf]
         cmp r0, #0x0
         beq .L1410
         sub r0, #0x1
         strb r0, [r3, #0xf]
         lsl r0, #0x18
         cmp r0, #0x0
         beq .L1812
     4mov r0, #0xff
         b .La068
     9ldr r2, [pc, #0x20] # REFERENCE_.L3c
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x20] # REFERENCE_.L40
         mul r0, r1
         ldr r1, [pc, #0x20] # REFERENCE_.L44
         add r0, r1
         str r0, [r2, #0x0]
         lsr r2, r0, #0x8
         mov r0, #0x7
         and r2, r0
         cmp r2, #0x7
         bhi .L7647
         lsl r0, r2, #0x2
         ldr r1, [pc, #0x14] # REFERENCE_.L48
         add r0, r1
         ldr r0, [r0, #0x0]
         mov pc, r0
         .hword 0x0
         .word gPseudoRandom
         .word 0x196225
         .word 0x3c6ef35f
         .word .L4c34
     33.word .L7647
         .word .L7647
         .word .L7647
         .word .L7647
         .word .L7647
         .word .L6c42
         .word .L7044
         .word .L7446
     39mov r2, #0x0
         b .L7647
     40mov r2, #0x1
         b .L7647
     41mov r2, #0x2
     23lsl r0, r2, #0x4
         sub r0, r2
         lsl r0, #0x2
         add r0, #0xec
         add r3, r0
         mov r1, r3
         add r1, #0x14
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         ldr r0, [pc, #0x18] # REFERENCE_.La4
         strh r0, [r1, #0xc]
         mov r0, #0x0
         cmp r2, #0x0
         beq .L9462
         mov r0, #0xb
     60strb r0, [r1, #0x1a]
         mov r0, #0x0
         strb r0, [r3, #0x4]
         mov r0, #0x1
         str r0, [r3, #0x0]
         mov r0, r2
     11pop {r1}
         bx r1
         .word 0x484
```

## `sub_807C670`

```c
void sub_807C670() { }
```

```asm
         push {r4, r5, lr}
         sub sp, #0x4
         mov r4, r0
         mov r5, #0x0
         ldr r1, [pc, #0x30] # REFERENCE_.L3c
         mov r0, sp
         mov r2, #0x4
         bl memcpy-0x4
         ldr r2, [pc, #0x2c] # REFERENCE_.L40
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0x2c] # REFERENCE_.L44
         mul r0, r1
         ldr r1, [pc, #0x2c] # REFERENCE_.L48
         add r0, r1
         str r0, [r2, #0x0]
         mov r2, r0
         ldr r1, [pc, #0x28] # REFERENCE_.L4c
         bl __umodsi3-0x4
         mov r2, r0
         ldr r0, [pc, #0x24] # REFERENCE_.L50
         ldrb r0, [r0, #0x1]
         cmp r0, #0x0
         bne .L5434
         ldrb r0, [r4, #0x0]
         cmp r0, #0x4
         bhi .L5c38
         b .L7450
         .hword 0x0
         .word gUnknown_080D5CA0
         .word gPseudoRandom
         .word 0x196225
         .word 0x3c6ef35f
         .word 0x2710
         .word gStageData
     22ldrb r0, [r4, #0x0]
         cmp r0, #0x3
         bhi .L5c38
         mov r5, #0x1
     25cmp r5, #0x0
         bne .L7450
         ldrb r0, [r4, #0x12]
         add r0, sp, r0
         ldrb r0, [r0, #0x0]
         strb r0, [r4, #0x1]
         ldrb r0, [r4, #0x12]
         add r0, #0x1
         mov r1, #0x3
         and r0, r1
         strb r0, [r4, #0x12]
         b .La873
     26ldr r0, [pc, #0x8] # REFERENCE_.L80
         cmp r2, r0
         bhi .L8457
         mov r0, #0x1
         b .La672
         .hword 0x0
         .word 0x9c3
     52ldr r0, [pc, #0x8] # REFERENCE_.L90
         cmp r2, r0
         bhi .L9464
         mov r0, #0x2
         b .La672
         .hword 0x0
         .word 0x1387
     59ldr r0, [pc, #0x8] # REFERENCE_.La0
         cmp r2, r0
         bhi .La471
         mov r0, #0x3
         b .La672
         .hword 0x0
         .word 0x1d4b
     66mov r0, #0x4
     54strb r0, [r4, #0x1]
     49mov r1, #0x0
         mov r0, #0x1
         strh r0, [r4, #0x8]
         strh r1, [r4, #0xc]
         add sp, #0x4
         pop {r4, r5}
         pop {r0}
         bx r0
```

## `m4aMPlayTempoControl`

```c
void m4aMPlayTempoControl(struct MP2KPlayerState *mplayInfo, u16 tempo)
{
    if (mplayInfo->lockStatus == ID_NUMBER) {
        mplayInfo->lockStatus++;
        mplayInfo->tempoScale = tempo;
        mplayInfo->tempoInterval = (mplayInfo->tempoRawBPM * mplayInfo->tempoScale) >> 8;
        mplayInfo->lockStatus = ID_NUMBER;
    }
}
```

```asm
         push {r4, lr}
         mov r2, r0
         lsl r1, #0x10
         lsr r1, #0x10
         ldr r3, [r2, #0x34]
         ldr r0, [pc, #0x18] # REFERENCE_.L24
         cmp r3, r0
         bne .L1c14
         strh r1, [r2, #0x1e]
         ldrh r4, [r2, #0x1c]
         mov r0, r1
         mul r0, r4
         asr r0, #0x8
         strh r0, [r2, #0x20]
     7pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x68736d53
```

## `sa3__sub_80B1560`

```c
s16 sa3__sub_80B1560(s16 *unk28, u16 unk5C)
{
    s32 r7, r3, r5;
    u32 r0;

    s16 *r4 = &unk28[unk5C / 4096];
    u16 r1 = unk5C % 4096;
    r7 = (4095 - r1);

    r7 = (r7 * (SQUARE(r7) >> 12)) >> 12; // (r7 * ((r7 * r7) / 4096)) / 4096
    r0 = (r7 * r4[0] * 171) >> 10; // / 1024

    r3 = SQUARE(r1) >> 12; // (r1 * r1) / 1024
    r7 = (r3 * r1) >> 12; // (r3 * r1) / 1024

    r0 += (r4[1] * (((((r3 * r1) >> 13) - r3) + gUnknown_080DBE54[0])));

    r4 += 2;

    r0 += (r4[0] * (((((r1 + r3)) - r7) >> 1) + gUnknown_080DBE54[1]));
    r0 += ((r7 * r4[1] * 171) >> 10);

    r0 *= 16;
    r0 /= 16;
    return r0 / 4096;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r8
         push {r7}
         mov r4, r0
         lsl r1, #0x10
         lsr r0, r1, #0x1c
         lsl r0, #0x1
         add r4, r0
         ldr r0, [pc, #0x78] # REFERENCE_.L8c
         lsr r1, #0x10
         and r1, r0
         sub r7, r0, r1
         mov r0, r7
         mul r0, r7
         asr r0, #0xc
         mul r0, r7
         asr r7, r0, #0xc
         mov r2, #0x0
         ldrsh r0, [r4, r2]
         mul r0, r7
         mov r5, #0xab
         mov r8, r5
         mov r6, r8
         mul r6, r0
         mov r0, r6
         asr r0, #0xa
         mov r3, r1
         mul r3, r1
         asr r3, #0xc
         mov r2, r3
         mul r2, r1
         asr r7, r2, #0xc
         mov r6, #0x2
         ldrsh r5, [r4, r6]
         mov r12, r5
         asr r2, #0xd
         ldr r6, [pc, #0x44] # REFERENCE_.L90
         sub r2, r3
         ldrh r5, [r6, #0x0]
         add r2, r5
         mov r5, r12
         mul r5, r2
         mov r2, r5
         add r0, r2
         add r4, #0x4
         mov r5, #0x0
         ldrsh r2, [r4, r5]
         add r1, r3
         sub r1, r7
         asr r1, #0x1
         ldrh r6, [r6, #0x2]
         add r1, r6
         mul r1, r2
         add r0, r1
         mov r6, #0x2
         ldrsh r1, [r4, r6]
         mul r1, r7
         mov r2, r8
         mul r2, r1
         mov r1, r2
         asr r1, #0xa
         add r0, r1
         lsl r0, #0x4
         asr r0, #0x10
         pop {r3}
         mov r8, r3
         pop {r4, r5, r6, r7}
         pop {r1}
         bx r1
         .hword 0x0
         .word 0xfff
         .word gUnknown_080DBE54
```

## `sub_8065EB0`

```c
void sub_8065EB0(Kyacchaa *enemy)
{
    u16 upperBound = enemy->upperBound;
    u32 flags = enemy->s2.frameFlags;

    if (flags & SPRITE_FLAG_MASK_X_FLIP) {
        // Moving upward/right direction
        if (enemy->qPos.x <= upperBound) {
            enemy->qPos.x += Q(1);

            if (enemy->qPos.x > upperBound) {
                enemy->qPos.x = upperBound;

                SPRITE_FLAG_CLEAR(&enemy->s2, X_FLIP);
                SPRITE_FLAG_CLEAR(&enemy->s, X_FLIP);
            }
        }
    } else {
        // Moving downward/left direction
        u16 lowerBound = enemy->lowerBound;

        if (enemy->qPos.x >= lowerBound) {
            enemy->qPos.x -= Q(1);

            if (enemy->qPos.x < lowerBound) {
                enemy->qPos.x = lowerBound;

                SPRITE_FLAG_SET(&enemy->s2, X_FLIP);
                SPRITE_FLAG_SET(&enemy->s, X_FLIP);
            }
        }
    }
}
```

```asm
         push {r4, r5, lr}
         mov r2, r0
         ldrh r1, [r2, #0x2c]
         ldr r3, [r2, #0x64]
         mov r4, #0x80
         lsl r4, #0x3
         mov r0, r3
         and r0, r4
         cmp r0, #0x0
         beq .L3827
         ldr r0, [r2, #0x20]
         cmp r0, r1
         bgt .L5642
         mov r4, #0x80
         lsl r4, #0x1
         add r0, r4
         str r0, [r2, #0x20]
         cmp r0, r1
         ble .L5642
         str r1, [r2, #0x20]
         ldr r1, [pc, #0x8] # REFERENCE_.L34
         and r3, r1
         str r3, [r2, #0x64]
         ldr r0, [r2, #0x3c]
         and r0, r1
         b .L5441
         .word 0xfffffbff
     9ldrh r1, [r2, #0x30]
         ldr r0, [r2, #0x20]
         cmp r0, r1
         blt .L5642
         ldr r5, [pc, #0x18] # REFERENCE_.L5c
         add r0, r5
         str r0, [r2, #0x20]
         cmp r0, r1
         bge .L5642
         str r1, [r2, #0x20]
         orr r3, r4
         str r3, [r2, #0x64]
         ldr r0, [r2, #0x3c]
         orr r0, r4
     25str r0, [r2, #0x3c]
     12pop {r4, r5}
         pop {r0}
         bx r0
         .word 0xffffff00
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_806D01C
sub_806D01C: @ 0x0806D01C
	push {lr}
	adds r3, r0, #0
	ldr r2, _0806D048 @ =gPseudoRandom
	ldr r1, [r2]
	ldr r0, _0806D04C @ =0x00196225
	muls r0, r1, r0
	ldr r1, _0806D050 @ =0x3C6EF35F
	adds r0, r0, r1
	str r0, [r2]
	lsrs r0, r0, #8
	movs r1, #1
	ands r0, r1
	cmp r0, #0
	beq _0806D058
	adds r0, r3, #0
	adds r0, #0x24
	strb r1, [r0]
	ldrb r0, [r3, #0x1d]
	cmp r0, #1
	bne _0806D070
	ldr r0, _0806D054 @ =0xFFFFF900
	b _0806D072
	.align 2, 0
_0806D048: .4byte gPseudoRandom
_0806D04C: .4byte 0x00196225
_0806D050: .4byte 0x3C6EF35F
_0806D054: .4byte 0xFFFFF900
_0806D058:
	adds r0, r3, #0
	adds r0, #0x24
	movs r1, #0xff
	strb r1, [r0]
	ldrb r0, [r3, #0x1d]
	cmp r0, #1
	bne _0806D070
	ldr r0, _0806D06C @ =0xFFFFF900
	b _0806D072
	.align 2, 0
_0806D06C: .4byte 0xFFFFF900
_0806D070:
	ldr r0, _0806D078 @ =0xFFFFFF00
_0806D072:
	str r0, [r3, #0x40]
	pop {r0}
	bx r0
	.align 2, 0
_0806D078: .4byte 0xFFFFFF00
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
