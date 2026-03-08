You are decompiling an assembly function called `sub_806A818` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_80190C8`

```c
void sub_80190C8(void)
{
    void *temp_r0;
    Strc_PlayerStrc30 *strc = TASK_DATA(gCurTask);
    Sprite *s = &strc->s;
    Player *p = strc->p;
    Player *partner = GET_SP_PLAYER_V1(PLAYER_2);

    if (p->moveState & 0x100) {
        AdvanceVariant(p);
    } else {
        s->x = I(partner->qWorldX) - gCamera.x;
        s->y = I(partner->qWorldY) - gCamera.y;
        UpdateSpriteAnimation(s);
        DisplaySprite(s);
    }
}
```

```asm
         push {r4, lr}
         ldr r0, [pc, #0x4c] # REFERENCE_.L50
         ldr r0, [r0, #0x0]
         ldrh r1, [r0, #0x6]
         mov r0, #0xc0
         lsl r0, #0x12
         add r4, r1, r0
         ldr r2, [r4, #0x28]
         mov r0, r2
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x2c] # REFERENCE_.L54
         add r3, r0, r1
         ldr r0, [r2, #0x4]
         mov r1, #0x80
         lsl r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L5c43
         add r2, #0xd0
         ldr r0, [r2, #0x0]
         cmp r0, #0x0
         beq .L7e58
         ldrh r0, [r0, #0x6]
         mov r1, #0xc0
         lsl r1, #0x12
         add r0, r1
         mov r1, #0x1
         strb r1, [r0, #0x1a]
         ldr r1, [r2, #0x0]
         ldr r0, [pc, #0xc] # REFERENCE_.L58
         str r0, [r1, #0x8]
         b .L7e58
         .word gCurTask
         .word gPlayers
         .word sub_8019150
     25ldr r0, [r3, #0x10]
         asr r0, #0x8
         ldr r2, [pc, #0x20] # REFERENCE_.L84
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
     29pop {r4}
         pop {r0}
         bx r0
         .word gCamera
```

## `sub_805E7A4`

```c
void sub_805E7A4(JugglingPin *proj)
{
    u8 *vram = proj->vram;
    Sprite2 *s;

    s = &proj->s;
    s->tiles = vram;
    s->anim = gUnknown_080D1F7C[0].anim;
    s->variant = gUnknown_080D1F7C[0].variant;
    s->prevVariant = -1;
    s->x = I(proj->qPos.x) - gCamera.x;
    s->y = I(proj->qPos.y) - gCamera.y;
    s->oamFlags = SPRITE_OAM_ORDER(19);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->animSpeed = SPRITE_ANIM_SPEED(2.0);
    s->palId = 0;
    s->frameFlags = 0x1000;

    if (proj->unk8 != 0) {
        s->frameFlags |= 0x400;
        s->frameFlags |= 0x1000;
    }
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    UpdateSpriteAnimation((Sprite *)s);
}
```

```asm
         push {r4, r5, r6, lr}
         ldr r1, [r0, #0x14]
         mov r6, r0
         add r6, #0x28
         str r1, [r0, #0x28]
         ldr r2, [pc, #0x5c] # REFERENCE_.L68
         ldrh r1, [r2, #0x0]
         mov r5, #0x0
         mov r4, #0x0
         strh r1, [r6, #0xc]
         ldrb r1, [r2, #0x2]
         strb r1, [r6, #0x1a]
         mov r1, #0xff
         strb r1, [r6, #0x1b]
         ldr r1, [r0, #0x20]
         asr r1, #0x8
         ldr r3, [pc, #0x48] # REFERENCE_.L6c
         ldr r2, [r3, #0x0]
         sub r1, r2
         strh r1, [r6, #0x10]
         ldr r1, [r0, #0x24]
         asr r1, #0x8
         ldr r2, [r3, #0x4]
         sub r1, r2
         strh r1, [r6, #0x12]
         mov r1, #0x98
         lsl r1, #0x3
         strh r1, [r6, #0x14]
         strh r4, [r6, #0xe]
         strh r4, [r6, #0x16]
         mov r1, #0x20
         strb r1, [r6, #0x1c]
         strb r5, [r6, #0x1f]
         mov r1, #0x80
         lsl r1, #0x5
         str r1, [r6, #0x8]
         ldrb r0, [r0, #0x8]
         cmp r0, #0x0
         beq .L5643
         mov r0, #0x80
         lsl r0, #0x3
         orr r0, r1
         str r0, [r6, #0x8]
     38mov r0, #0x1
         neg r0, r0
         str r0, [r6, #0x20]
         mov r0, r6
         bl UpdateSpriteAnimation-0x4
         pop {r4, r5, r6}
         pop {r0}
         bx r0
         .word gUnknown_080D1F7C
         .word gCamera
```

## `sub_803B118`

```c
void sub_803B118(Capsule *cap, u8 i)
{
    CapSwitch *swit;
    Sprite *s;

    if ((cap->unkE == 0xFF) || i == cap->unkE) {
        return;
    }

    swit = &cap->switches[cap->unkE];
    s = &swit->s;

    swit->unk0 = 0;
    swit->unk4 = 0;

    s->anim = ANIM_BONUS_CAPSULE_SWITCH;
    s->variant = (cap->unkE == 0) ? 9 : 20;
    s->prevVariant = -1;
    UpdateSpriteAnimation(s);

    if (i != 0xFF) {
        swit = &cap->switches[i];
        s = &swit->s;

        swit->unk4 = 0;
        swit->unk0 = 1;

        s->anim = ANIM_BONUS_CAPSULE_SWITCH;
        s->variant = (i == 0) ? 0 : 11;
        s->prevVariant = -1;

        UpdateSpriteAnimation(s);
    }

    cap->unkF = 0;
    cap->unkE = i;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r4, r0
         lsl r1, #0x18
         lsr r5, r1, #0x18
         ldrb r0, [r4, #0xe]
         cmp r0, #0xff
         beq .L8062
         cmp r5, r0
         beq .L8062
         mov r1, r0
         lsl r0, r1, #0x4
         sub r0, r1
         lsl r0, #0x2
         add r0, #0xec
         add r1, r4, r0
         mov r2, r1
         add r2, #0x14
         mov r0, #0x0
         str r0, [r1, #0x0]
         strb r0, [r1, #0x4]
         ldr r7, [pc, #0x5c] # REFERENCE_.L88
         strh r7, [r2, #0xc]
         ldrb r0, [r4, #0xe]
         mov r1, #0x14
         cmp r0, #0x0
         bne .L3627
         mov r1, #0x9
     25strb r1, [r2, #0x1a]
         mov r0, #0x1
         neg r0, r0
         mov r6, r0
         mov r0, #0xff
         strb r0, [r2, #0x1b]
         mov r0, r2
         bl UpdateSpriteAnimation-0x4
         cmp r5, #0xff
         beq .L7a59
         lsl r0, r5, #0x4
         sub r0, r5
         lsl r0, #0x2
         add r0, #0xec
         add r1, r4, r0
         mov r2, r1
         add r2, #0x14
         mov r0, #0x0
         strb r0, [r1, #0x4]
         mov r0, #0x1
         str r0, [r1, #0x0]
         strh r7, [r2, #0xc]
         mov r0, #0x0
         cmp r5, #0x0
         beq .L6c53
         mov r0, #0xb
     51strb r0, [r2, #0x1a]
         ldrb r0, [r2, #0x1b]
         orr r0, r6
         strb r0, [r2, #0x1b]
         mov r0, r2
         bl UpdateSpriteAnimation-0x4
     36mov r0, #0x0
         strb r0, [r4, #0xf]
         strb r5, [r4, #0xe]
     6pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x484
```

## `sub_8064564`

```c
s32 sub_8064564(ClamProj *proj)
{
    Sprite2 *s;
    s32 dx, dy;
    AnimCmdResult acmdRes;

    s = &proj->s;
    dx = TO_WORLD_POS_RAW(I(proj->qPos.x), proj->region[0]) - gCamera.x;
    s->x = dx;
    dy = TO_WORLD_POS_RAW(I(proj->qPos.y), proj->region[1]) - gCamera.y;
    s->y = dy;
    s->x = dx + I(proj->unk14);

    if (proj->unk0 != 0) {
        dy += 20;
        dy += I(proj->unk18);
        s->y = dy;
    } else {
        dy -= 20;
        dy += I(proj->unk18);
        s->y = dy;
    }

    if (proj->unk1 != 0) {
        s->x += 10;
    } else {
        s->x -= 10;
    }

    acmdRes = UpdateSpriteAnimation((Sprite *)s);
    DisplaySprite((Sprite *)s);
    return acmdRes;
}
```

```asm
         push {r4, r5, lr}
         mov r4, r0
         mov r5, r4
         add r5, #0x1c
         ldr r2, [r4, #0xc]
         asr r2, #0x8
         ldrh r0, [r4, #0x2]
         lsl r0, #0x8
         add r2, r0
         ldr r3, [pc, #0x28] # REFERENCE_.L3c
         ldr r0, [r3, #0x0]
         sub r2, r0
         strh r2, [r5, #0x10]
         ldr r1, [r4, #0x10]
         asr r1, #0x8
         ldrh r0, [r4, #0x4]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r3, #0x4]
         sub r1, r0
         strh r1, [r5, #0x12]
         ldr r0, [r4, #0x14]
         asr r0, #0x8
         add r2, r0
         strh r2, [r5, #0x10]
         ldrb r0, [r4, #0x0]
         cmp r0, #0x0
         beq .L4031
         add r1, #0x14
         b .L4232
         .word gCamera
     27sub r1, #0x14
     29ldr r0, [r4, #0x18]
         asr r0, #0x8
         add r1, r0
         strh r1, [r5, #0x12]
         ldrb r0, [r4, #0x1]
         cmp r0, #0x0
         beq .L5642
         ldrh r0, [r5, #0x10]
         add r0, #0xa
         b .L5a44
     38ldrh r0, [r5, #0x10]
         sub r0, #0xa
     41strh r0, [r5, #0x10]
         mov r0, r5
         bl UpdateSpriteAnimation-0x4
         mov r4, r0
         mov r0, r5
         bl DisplaySprite-0x4
         mov r0, r4
         pop {r4, r5}
         pop {r1}
         bx r1
```

## `sub_80631F8`

```c
void sub_80631F8(Muukaden *enemy)
{
    Sprite2 *s;
    SpriteTransform *tf;

    tf = &enemy->tf;
    s = enemy->sprites;

    s->x = TO_WORLD_POS_RAW(I(enemy->qPos.x), enemy->region[0]) - gCamera.x;
    s->y = TO_WORLD_POS_RAW(I(enemy->qPos.y), enemy->region[1]) - gCamera.y;

    sub_806359C(s, tf, enemy);

    if (SPRITE_FLAG_GET(s, ROT_SCALE_ENABLE)) {
        tf->x = s->x;
        tf->y = s->y;
        TransformSprite((Sprite *)s, tf);
    }
    UpdateSpriteAnimation((Sprite *)s);
    DisplaySprite((Sprite *)s);
}
```

```asm
         push {r4, r5, lr}
         mov r2, r0
         mov r5, r2
         add r5, #0x6c
         mov r4, r2
         add r4, #0x78
         ldr r1, [r2, #0x64]
         asr r1, #0x8
         ldrh r0, [r2, #0x14]
         lsl r0, #0x8
         add r1, r0
         ldr r3, [pc, #0x4c] # REFERENCE_.L64
         ldr r0, [r3, #0x0]
         sub r1, r0
         strh r1, [r4, #0x10]
         ldr r1, [r2, #0x68]
         asr r1, #0x8
         ldrh r0, [r2, #0x16]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r3, #0x4]
         sub r1, r0
         strh r1, [r4, #0x12]
         mov r0, r4
         mov r1, r5
         bl sub_806359C-0x4
         ldr r0, [r4, #0x8]
         mov r1, #0x20
         and r0, r1
         cmp r0, #0x0
         beq .L5038
         ldrh r0, [r4, #0x10]
         strh r0, [r5, #0x6]
         ldrh r0, [r4, #0x12]
         strh r0, [r5, #0x8]
         mov r0, r4
         mov r1, r5
         bl TransformSprite-0x4
     30mov r0, r4
         bl UpdateSpriteAnimation-0x4
         mov r0, r4
         bl DisplaySprite-0x4
         pop {r4, r5}
         pop {r0}
         bx r0
         .hword 0x0
         .word gCamera
```

# Declarations for the functions called from the target assembly

- `void ResolvePlayerSpriteCollision(Sprite *s, Player *p);`

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
typedef struct Player Player;
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_806A818
sub_806A818: @ 0x0806A818
	push {r4, r5, lr}
	adds r4, r0, #0
	movs r0, #0x9c
	lsls r0, r0, #1
	adds r5, r4, r0
	ldr r1, [r4, #0x50]
	ldr r0, [r1, #4]
	movs r3, #0x80
	lsls r3, r3, #0x14
	orrs r0, r3
	str r0, [r1, #4]
	ldr r2, [r4, #0x54]
	ldr r0, [r2, #4]
	orrs r0, r3
	str r0, [r2, #4]
	movs r0, #0
	strh r0, [r4, #0x32]
	strh r0, [r4, #0x2c]
	strh r0, [r4, #0x2e]
	adds r0, r5, #0
	bl ResolvePlayerSpriteCollision
	ldr r1, [r4, #0x54]
	adds r0, r5, #0
	bl ResolvePlayerSpriteCollision
	pop {r4, r5}
	pop {r0}
	bx r0
	.align 2, 0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
