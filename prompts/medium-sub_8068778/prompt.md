You are decompiling an assembly function called `sub_8068778` in ARMv4T from a Game Boy Advance game.

# Examples

## `m4aSoundVSyncOn`

```c
void m4aSoundVSyncOn(void)
{
    struct SoundMixerState *soundInfo = SOUND_INFO_PTR;
    u32 lockStatus = soundInfo->lockStatus;

    if (lockStatus == ID_NUMBER)
        return;

    REG_DMA1CNT_H = DMA_ENABLE | DMA_START_SPECIAL | DMA_32BIT | DMA_REPEAT;
    REG_DMA2CNT_H = DMA_ENABLE | DMA_START_SPECIAL | DMA_32BIT | DMA_REPEAT;

    soundInfo->dmaCounter = 0;
    soundInfo->lockStatus = lockStatus - 10;
}
```

```asm
         push {r4, lr}
         ldr r0, [pc, #0x2c] # REFERENCE_.L30
         ldr r2, [r0, #0x0]
         ldr r3, [r2, #0x0]
         ldr r0, [pc, #0x28] # REFERENCE_.L34
         cmp r3, r0
         beq .L2820
         ldr r0, [pc, #0x28] # REFERENCE_.L38
         mov r4, #0xb6
         lsl r4, #0x8
         mov r1, r4
         strh r1, [r0, #0x0]
         add r0, #0xc
         strh r1, [r0, #0x0]
         ldrb r0, [r2, #0x4]
         mov r0, #0x0
         strb r0, [r2, #0x4]
         mov r0, r3
         sub r0, #0xa
         str r0, [r2, #0x0]
     6pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x3007ff0
         .word 0x68736d53
         .word 0x40000c6
```

## `sub_8016E70`

```c
void sub_8016E70(Player *arg0)
{
    if (arg0->qSpeedAirY >= 0) {
        sub_8012C34(arg0);
        sub_8012CF8(arg0);
    } else {
        sub_8012CF8(arg0);
        sub_8012C34(arg0);
    }

    if (!(4 & arg0->moveState)) {
        arg0->moveState = arg0->moveState & 0xFFF7FFFF;
    }
}
```

```asm
         push {r4, lr}
         mov r4, r0
         mov r1, #0x1a
         ldrsh r0, [r4, r1]
         cmp r0, #0x0
         blt .L1a11
         mov r0, r4
         bl sub_8012C34-0x4
         mov r0, r4
         bl sub_8012CF8-0x4
         b .L2615
     5mov r0, r4
         bl sub_8012CF8-0x4
         mov r0, r4
         bl sub_8012C34-0x4
     10ldr r1, [r4, #0x4]
         mov r0, #0x4
         and r0, r1
         cmp r0, #0x0
         bne .L3623
         ldr r0, [pc, #0x8] # REFERENCE_.L3c
         and r1, r0
         str r1, [r4, #0x4]
     19pop {r4}
         pop {r0}
         bx r0
         .word 0xfff7ffff
```

## `sub_80C66DC`

```c
void sub_80C66DC() { }
```

```asm
         push {r4, r5, lr}
         ldr r3, [pc, #0x3c] # REFERENCE_.L40
         mov r4, #0x0
         strh r4, [r3, #0x0]
         ldr r2, [pc, #0x38] # REFERENCE_.L44
         ldrh r1, [r2, #0x0]
         ldr r0, [pc, #0x38] # REFERENCE_.L48
         and r0, r1
         strh r0, [r2, #0x0]
         mov r5, #0x1
         strh r5, [r3, #0x0]
         strh r4, [r3, #0x0]
         sub r2, #0xd8
         ldrh r1, [r2, #0x0]
         ldr r0, [pc, #0x2c] # REFERENCE_.L4c
         and r0, r1
         strh r0, [r2, #0x0]
         strh r5, [r3, #0x0]
         ldr r0, [pc, #0x28] # REFERENCE_.L50
         strh r4, [r0, #0x0]
         ldr r1, [pc, #0x28] # REFERENCE_.L54
         mov r2, #0x80
         lsl r2, #0x8
         mov r0, r2
         strh r0, [r1, #0x0]
         ldr r1, [pc, #0x24] # REFERENCE_.L58
         mov r0, #0x5
         strb r0, [r1, #0x0]
         pop {r4, r5}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x4000208
         .word 0x4000200
         .word 0xffbf
         .word 0xff7f
         .word 0x400010e
         .word 0x400010c
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

## `InitWaterEffectSprite`

```c
void InitWaterEffectSprite(WaterCannon *cannon)
{
    Sprite *s = &cannon->s2;
    s->tiles = cannon->tiles + MAX_TILES(ANIM_WATER_CANNON) * TILE_SIZE_4BPP;
    s->anim = ANIM_WATER_CANNON_SPLASH;
    s->variant = 0;
    s->oamFlags = SPRITE_OAM_ORDER(12);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);
}
```

```asm
         push {r4, lr}
         mov r2, r0
         add r2, #0x44
         ldr r1, [r0, #0x6c]
         mov r3, #0xc0
         lsl r3, #0x2
         add r1, r3
         str r1, [r0, #0x44]
         mov r4, #0x0
         mov r1, #0x0
         ldr r0, [pc, #0x24] # REFERENCE_.L3c
         strh r0, [r2, #0xc]
         strb r4, [r2, #0x1a]
         strh r3, [r2, #0x14]
         strh r1, [r2, #0xe]
         strh r1, [r2, #0x16]
         mov r0, #0xff
         strb r0, [r2, #0x1b]
         mov r0, #0x10
         strb r0, [r2, #0x1c]
         strb r4, [r2, #0x1f]
         sub r0, #0x11
         str r0, [r2, #0x20]
         mov r0, #0x80
         lsl r0, #0x5
         str r0, [r2, #0x8]
         pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x3a6
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8068778
sub_8068778: @ 0x08068778
	push {r4, r5, lr}
	adds r4, r0, #0
	adds r5, r4, #0
	adds r5, #0x3c
	movs r1, #0x2c
	bl sub_80689DC
	cmp r0, #0
	beq _080687A4
	ldr r0, [r4, #0xc]
	ldr r1, _080687AC @ =0xFFFFF800
	adds r0, r0, r1
	str r0, [r4, #0xc]
	ldr r0, [r5, #8]
	movs r1, #0x80
	lsls r1, r1, #3
	ands r0, r1
	cmp r0, #0
	beq _080687A4
	ldrb r0, [r5, #0x1a]
	adds r0, #1
	strb r0, [r5, #0x1a]
_080687A4:
	movs r0, #0
	pop {r4, r5}
	pop {r1}
	bx r1
	.align 2, 0
_080687AC: .4byte 0xFFFFF800
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
