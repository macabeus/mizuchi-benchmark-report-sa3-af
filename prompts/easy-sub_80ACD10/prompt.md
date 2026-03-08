You are decompiling an assembly function called `sub_80ACD10` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_804AC58`

```c
void sub_804AC58(ClosingWall *wall)
{
    Sprite *s;
    wall->tiles = ALLOC_TILES(ANIM_CLOSING_WALL);

    s = &wall->s[0];
    s->tiles = wall->tiles;
    s->anim = ANIM_CLOSING_WALL;
    s->variant = 0;
    s->oamFlags = SPRITE_OAM_ORDER(24);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);
    UpdateSpriteAnimation(s);

    s = &wall->s[1];
    s->tiles = wall->tiles;
    s->anim = ANIM_CLOSING_WALL;
    s->variant = 0;
    s->oamFlags = SPRITE_OAM_ORDER(24);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG_MASK_19 | SPRITE_FLAG_MASK_X_FLIP | SPRITE_FLAG(PRIORITY, 1);
    UpdateSpriteAnimation(s);
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         mov r7, r0
         mov r0, #0x1b
         bl VramMalloc-0x4
         str r0, [r7, #0x68]
         mov r1, r7
         add r1, #0xc
         str r0, [r7, #0xc]
         mov r5, #0x0
         mov r4, #0x0
         ldr r0, [pc, #0x70] # REFERENCE_.L90
         mov r10, r0
         mov r0, r10
         strh r0, [r1, #0xc]
         strb r5, [r1, #0x1a]
         mov r0, #0xc0
         lsl r0, #0x3
         mov r9, r0
         mov r0, r9
         strh r0, [r1, #0x14]
         strh r4, [r1, #0xe]
         strh r4, [r1, #0x16]
         mov r0, #0xff
         strb r0, [r1, #0x1b]
         mov r0, #0x10
         mov r8, r0
         mov r0, r8
         strb r0, [r1, #0x1c]
         strb r5, [r1, #0x1f]
         mov r6, #0x1
         neg r6, r6
         str r6, [r1, #0x20]
         mov r0, #0x80
         lsl r0, #0x5
         str r0, [r1, #0x8]
         mov r0, r1
         bl UpdateSpriteAnimation-0x4
         mov r1, r7
         add r1, #0x34
         ldr r0, [r7, #0x68]
         str r0, [r7, #0x34]
         mov r0, r10
         strh r0, [r1, #0xc]
         strb r5, [r1, #0x1a]
         mov r0, r9
         strh r0, [r1, #0x14]
         strh r4, [r1, #0xe]
         strh r4, [r1, #0x16]
         mov r0, r6
         strb r0, [r1, #0x1b]
         mov r0, r8
         strb r0, [r1, #0x1c]
         strb r5, [r1, #0x1f]
         str r6, [r1, #0x20]
         ldr r0, [pc, #0x18] # REFERENCE_.L94
         str r0, [r1, #0x8]
         mov r0, r1
         bl UpdateSpriteAnimation-0x4
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word 0x3a2
         .word 0x81400
```

## `sub_804ED44`

```c
void sub_804ED44(ItemBoxMP *itembox)
{
    Sprite *s = &itembox->sprBox;

    s->tiles = ALLOC_TILES(ANIM_ITEM_BOX);
    s->anim = ANIM_ITEM_BOX;
    s->variant = 0;
    s->oamFlags = SPRITE_OAM_ORDER(24);
    s->animCursor = 0;
    s->qAnimDelay = Q(0);
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1) | SPRITE_FLAG(MOSAIC, 1);
    UpdateSpriteAnimation(s);

    s = &itembox->sprItem;
    s->tiles = ALLOC_TILES(ANIM_ITEM_BOX_TYPE);
    s->anim = ANIM_ITEM_BOX_TYPE;
    s->variant = 15 + (gUnknown_03001060.unk55 & 0x1);
    s->oamFlags = SPRITE_OAM_ORDER(24);
    s->animCursor = 0;
    s->qAnimDelay = Q(0);
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1) | SPRITE_FLAG(MOSAIC, 1);
    UpdateSpriteAnimation(s);

    itembox->transform.rotation = 0;
    itembox->transform.qScaleX = Q(1);
    itembox->transform.qScaleY = Q(1);
    itembox->transform.x = 0;
    itembox->transform.y = 0;
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         mov r10, r0
         mov r7, r10
         add r7, #0xc
         mov r0, #0x10
         bl VramMalloc-0x4
         mov r1, r10
         str r0, [r1, #0xc]
         mov r4, #0x0
         ldr r0, [pc, #0x98] # REFERENCE_.Lb8
         strh r0, [r7, #0xc]
         mov r0, #0x0
         strb r0, [r7, #0x1a]
         mov r5, #0xc0
         lsl r5, #0x3
         strh r5, [r7, #0x14]
         strh r4, [r7, #0xe]
         strh r4, [r7, #0x16]
         mov r0, #0xff
         strb r0, [r7, #0x1b]
         mov r1, #0x10
         mov r9, r1
         mov r0, r9
         strb r0, [r7, #0x1c]
         mov r1, #0x0
         strb r1, [r7, #0x1f]
         mov r0, #0x1
         neg r0, r0
         mov r8, r0
         str r0, [r7, #0x20]
         mov r6, #0x90
         lsl r6, #0x5
         str r6, [r7, #0x8]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         add r7, #0x28
         mov r0, #0x4
         bl VramMalloc-0x4
         mov r1, r10
         str r0, [r1, #0x34]
         ldr r0, [pc, #0x5c] # REFERENCE_.Lbc
         strh r0, [r7, #0xc]
         ldr r0, [pc, #0x5c] # REFERENCE_.Lc0
         add r0, #0x55
         ldrb r1, [r0, #0x0]
         mov r0, #0x1
         and r0, r1
         add r0, #0xf
         strb r0, [r7, #0x1a]
         strh r5, [r7, #0x14]
         strh r4, [r7, #0xe]
         strh r4, [r7, #0x16]
         mov r0, #0x1
         neg r0, r0
         strb r0, [r7, #0x1b]
         mov r0, r9
         strb r0, [r7, #0x1c]
         mov r1, #0x0
         strb r1, [r7, #0x1f]
         mov r0, r8
         str r0, [r7, #0x20]
         str r6, [r7, #0x8]
         mov r0, r7
         bl UpdateSpriteAnimation-0x4
         mov r0, r10
         add r0, #0x5c
         strh r4, [r0, #0x0]
         add r0, #0x2
         mov r1, #0x80
         lsl r1, #0x1
         strh r1, [r0, #0x0]
         add r0, #0x2
         strh r1, [r0, #0x0]
         add r0, #0x2
         strh r4, [r0, #0x0]
         add r0, #0x2
         strh r4, [r0, #0x0]
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word 0x524
         .word 0x523
         .word gUnknown_03001060
```

## `sub_8040B34`

```c
void sub_8040B34(ActRing *ring)
{
    Sprite *s = &ring->s0;
    u8 act = ring->act;

    s->tiles = ALLOC_TILES(ANIM_ACT_RING);
    s->anim = ANIM_ACT_RING;
    s->variant = act;
    s->oamFlags = SPRITE_OAM_ORDER(24);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->prevVariant = -1;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);
    UpdateSpriteAnimation(s);

    if (ring->wasCompletedBefore) {
        s = &ring->s1;
        s->tiles = ALLOC_TILES_VARIANT(ANIM_ACT_RING, 3);
        s->anim = ANIM_ACT_RING;
        s->variant = 3;
        s->oamFlags = SPRITE_OAM_ORDER(24);
        s->animCursor = 0;
        s->qAnimDelay = 0;
        s->prevVariant = -1;
        s->animSpeed = SPRITE_ANIM_SPEED(1.0);
        s->palId = 0;
        s->hitboxes[0].index = HITBOX_STATE_INACTIVE;
        s->frameFlags = SPRITE_FLAG(PRIORITY, 1);
        UpdateSpriteAnimation(s);
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         mov r6, r0
         mov r5, r6
         add r5, #0xc
         add r0, #0x61
         ldrb r4, [r0, #0x0]
         mov r0, #0x10
         bl VramMalloc-0x4
         str r0, [r6, #0xc]
         mov r7, #0x0
         ldr r0, [pc, #0x8c] # REFERENCE_.Lac
         strh r0, [r5, #0xc]
         strb r4, [r5, #0x1a]
         mov r0, #0xc0
         lsl r0, #0x3
         strh r0, [r5, #0x14]
         strh r7, [r5, #0xe]
         strh r7, [r5, #0x16]
         mov r0, #0x1
         neg r0, r0
         mov r4, r0
         mov r0, #0xff
         strb r0, [r5, #0x1b]
         mov r0, #0x10
         mov r10, r0
         mov r0, r10
         strb r0, [r5, #0x1c]
         mov r0, #0x0
         strb r0, [r5, #0x1f]
         mov r0, #0x1
         neg r0, r0
         mov r9, r0
         str r0, [r5, #0x20]
         mov r0, #0x80
         lsl r0, #0x5
         mov r8, r0
         str r0, [r5, #0x8]
         mov r0, r5
         bl UpdateSpriteAnimation-0x4
         mov r0, r6
         add r0, #0x63
         ldrb r0, [r0, #0x0]
         cmp r0, #0x0
         beq .L9c74
         add r5, #0x28
         mov r0, #0x6
         bl VramMalloc-0x4
         str r0, [r6, #0x34]
         ldr r0, [pc, #0x3c] # REFERENCE_.Lac
         strh r0, [r5, #0xc]
         mov r0, #0x3
         strb r0, [r5, #0x1a]
         mov r0, #0xc0
         lsl r0, #0x3
         strh r0, [r5, #0x14]
         strh r7, [r5, #0xe]
         strh r7, [r5, #0x16]
         ldrb r0, [r5, #0x1b]
         orr r0, r4
         strb r0, [r5, #0x1b]
         mov r0, r10
         strb r0, [r5, #0x1c]
         mov r0, #0x0
         strb r0, [r5, #0x1f]
         mov r0, r9
         str r0, [r5, #0x20]
         mov r0, r8
         str r0, [r5, #0x8]
         mov r0, r5
         bl UpdateSpriteAnimation-0x4
     47pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x3d7
```

## `InitSprite_Kyacchaa`

```c
void InitSprite_Kyacchaa(Kyacchaa *enemy)
{
    void *tiles = VramMalloc(0x15);
    Sprite *s;
    void *secondaryTiles;

    // Initialize the second sprite (s2)
    s = &enemy->s2;
    s->tiles = tiles;

    secondaryTiles = tiles + (gUnknown_080D2198[0].numTiles << 5);

    s->anim = gUnknown_080D2198[0].anim;
    s->variant = gUnknown_080D2198[0].variant;
    s->prevVariant = -1;

    s->x = TO_WORLD_POS_RAW(I(enemy->qPos.x), enemy->region[0]) - gCamera.x;
    s->y = TO_WORLD_POS_RAW(I(enemy->qPos.y), enemy->region[1]) - gCamera.y;

    s->oamFlags = SPRITE_OAM_ORDER(18);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);

    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;

    UpdateSpriteAnimation(s);

    // Initialize the first sprite (s)
    s = &enemy->s;
    s->tiles = secondaryTiles;

    s->anim = gUnknown_080D2198[3].anim;
    s->variant = gUnknown_080D2198[3].variant;
    s->prevVariant = -1;

    s->x = TO_WORLD_POS_RAW(I(enemy->qPos.x), enemy->region[0]) - gCamera.x;
    s->y = TO_WORLD_POS_RAW(I(enemy->qPos.y), enemy->region[1]) - gCamera.y;

    s->oamFlags = SPRITE_OAM_ORDER(19);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);

    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;

    UpdateSpriteAnimation(s);
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
         mov r0, #0x15
         bl VramMalloc-0x4
         mov r5, r0
         mov r3, r7
         add r3, #0x5c
         str r5, [r7, #0x5c]
         ldr r4, [pc, #0xc8] # REFERENCE_.Le8
         ldr r0, [r4, #0x4]
         lsl r0, #0x5
         add r5, r0
         ldrh r0, [r4, #0x0]
         mov r2, #0x0
         strh r0, [r3, #0xc]
         ldrb r0, [r4, #0x2]
         strb r0, [r3, #0x1a]
         mov r0, #0xff
         strb r0, [r3, #0x1b]
         ldr r1, [r7, #0x20]
         asr r1, #0x8
         ldrh r0, [r7, #0x8]
         lsl r0, #0x8
         add r1, r0
         ldr r6, [pc, #0xac] # REFERENCE_.Lec
         ldr r0, [r6, #0x0]
         sub r1, r0
         strh r1, [r3, #0x10]
         ldr r1, [r7, #0x24]
         asr r1, #0x8
         ldrh r0, [r7, #0xa]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x4]
         sub r1, r0
         strh r1, [r3, #0x12]
         mov r0, #0x90
         lsl r0, #0x3
         strh r0, [r3, #0x14]
         strh r2, [r3, #0xe]
         strh r2, [r3, #0x16]
         mov r0, #0x10
         mov r10, r0
         mov r0, r10
         strb r0, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         mov r0, #0x80
         lsl r0, #0x5
         mov r9, r0
         str r0, [r3, #0x8]
         mov r0, #0x1
         neg r0, r0
         mov r8, r0
         str r0, [r3, #0x20]
         mov r0, r3
         str r2, [sp, #0x0]
         bl UpdateSpriteAnimation-0x4
         mov r3, r7
         add r3, #0x34
         str r5, [r7, #0x34]
         ldrh r0, [r4, #0x18]
         strh r0, [r3, #0xc]
         ldrb r0, [r4, #0x1a]
         strb r0, [r3, #0x1a]
         mov r0, #0x1
         neg r0, r0
         strb r0, [r3, #0x1b]
         ldr r1, [r7, #0x20]
         asr r1, #0x8
         ldrh r0, [r7, #0x8]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x0]
         sub r1, r0
         strh r1, [r3, #0x10]
         ldr r1, [r7, #0x24]
         asr r1, #0x8
         ldrh r0, [r7, #0xa]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x4]
         sub r1, r0
         strh r1, [r3, #0x12]
         mov r0, #0x98
         lsl r0, #0x3
         strh r0, [r3, #0x14]
         ldr r2, [sp, #0x0]
         strh r2, [r3, #0xe]
         strh r2, [r3, #0x16]
         mov r0, r10
         strb r0, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         mov r0, r9
         str r0, [r3, #0x8]
         mov r0, r8
         str r0, [r3, #0x20]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         add sp, #0x4
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gUnknown_080D2198
         .word gCamera
```

## `sub_805A674`

```c
void sub_805A674(Ape *enemy)
{
    void *tiles = VramMalloc(MAX_TILES(ANIM_APE) + MAX_TILES_VARIANT(ANIM_APE, 2));
    Sprite *s = &enemy->s;
    s->tiles = tiles;
    tiles += gUnknown_080D1ECC[2].numTiles * TILE_SIZE_4BPP;

    s->anim = gUnknown_080D1ECC[2].anim;
    s->variant = gUnknown_080D1ECC[2].variant;
    s->prevVariant = -1;
    s->x = TO_WORLD_POS_RAW(I(enemy->qPos.x), enemy->region[0]) - gCamera.x;
    s->y = TO_WORLD_POS_RAW(I(enemy->qPos.y), enemy->region[1]) - gCamera.y;
    s->oamFlags = SPRITE_OAM_ORDER(18);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);

    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;

    UpdateSpriteAnimation(s);

    s = &enemy->s2;
    s->tiles = tiles;

    s->anim = gUnknown_080D1ECC[0].anim;
    s->variant = gUnknown_080D1ECC[0].variant;
    s->prevVariant = -1;
    s->x = TO_WORLD_POS_RAW(I(enemy->qPos.x), enemy->region[0]) - gCamera.x;
    s->y = TO_WORLD_POS_RAW(I(enemy->qPos.y), enemy->region[1]) - gCamera.y;
    s->oamFlags = SPRITE_OAM_ORDER(19);
    s->animCursor = 0;
    s->qAnimDelay = 0;
    s->animSpeed = SPRITE_ANIM_SPEED(1.0);
    s->palId = 0;
    s->frameFlags = SPRITE_FLAG(PRIORITY, 1);

    s->hitboxes[0].index = HITBOX_STATE_INACTIVE;

    UpdateSpriteAnimation(s);
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
         mov r0, #0x18
         bl VramMalloc-0x4
         mov r5, r0
         mov r3, r7
         add r3, #0x24
         str r5, [r7, #0x24]
         ldr r4, [pc, #0xc8] # REFERENCE_.Le8
         ldr r0, [r4, #0x14]
         lsl r0, #0x5
         add r5, r0
         ldrh r0, [r4, #0x10]
         mov r2, #0x0
         strh r0, [r3, #0xc]
         ldrb r0, [r4, #0x12]
         strb r0, [r3, #0x1a]
         mov r0, #0xff
         strb r0, [r3, #0x1b]
         ldr r1, [r7, #0x1c]
         asr r1, #0x8
         ldrh r0, [r7, #0xa]
         lsl r0, #0x8
         add r1, r0
         ldr r6, [pc, #0xac] # REFERENCE_.Lec
         ldr r0, [r6, #0x0]
         sub r1, r0
         strh r1, [r3, #0x10]
         ldr r1, [r7, #0x20]
         asr r1, #0x8
         ldrh r0, [r7, #0xc]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x4]
         sub r1, r0
         strh r1, [r3, #0x12]
         mov r0, #0x90
         lsl r0, #0x3
         strh r0, [r3, #0x14]
         strh r2, [r3, #0xe]
         strh r2, [r3, #0x16]
         mov r0, #0x10
         mov r10, r0
         mov r0, r10
         strb r0, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         mov r0, #0x80
         lsl r0, #0x5
         mov r9, r0
         str r0, [r3, #0x8]
         mov r0, #0x1
         neg r0, r0
         mov r8, r0
         str r0, [r3, #0x20]
         mov r0, r3
         str r2, [sp, #0x0]
         bl UpdateSpriteAnimation-0x4
         mov r3, r7
         add r3, #0x4c
         str r5, [r7, #0x4c]
         ldrh r0, [r4, #0x0]
         strh r0, [r3, #0xc]
         ldrb r0, [r4, #0x2]
         strb r0, [r3, #0x1a]
         mov r0, #0x1
         neg r0, r0
         strb r0, [r3, #0x1b]
         ldr r1, [r7, #0x1c]
         asr r1, #0x8
         ldrh r0, [r7, #0xa]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x0]
         sub r1, r0
         strh r1, [r3, #0x10]
         ldr r1, [r7, #0x20]
         asr r1, #0x8
         ldrh r0, [r7, #0xc]
         lsl r0, #0x8
         add r1, r0
         ldr r0, [r6, #0x4]
         sub r1, r0
         strh r1, [r3, #0x12]
         mov r0, #0x98
         lsl r0, #0x3
         strh r0, [r3, #0x14]
         ldr r2, [sp, #0x0]
         strh r2, [r3, #0xe]
         strh r2, [r3, #0x16]
         mov r0, r10
         strb r0, [r3, #0x1c]
         mov r0, #0x0
         strb r0, [r3, #0x1f]
         mov r0, r9
         str r0, [r3, #0x8]
         mov r0, r8
         str r0, [r3, #0x20]
         mov r0, r3
         bl UpdateSpriteAnimation-0x4
         add sp, #0x4
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gUnknown_080D1ECC
         .word gCamera
```

# Declarations for the functions called from the target assembly

- `AnimCmdResult UpdateSpriteAnimation(Sprite *);`
- `void *VramMalloc(u32);`

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

Decompile the following target assembly function from `asm/code_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_80ACD10
sub_80ACD10: @ 0x080ACD10
	push {r4, r5, r6, r7, lr}
	mov r7, sl
	mov r6, sb
	mov r5, r8
	push {r5, r6, r7}
	adds r7, r0, #0
	movs r0, #0x36
	bl VramMalloc
	adds r6, r0, #0
	adds r0, r7, #0
	adds r0, #0x5c
	str r6, [r7, #0x5c]
	ldr r4, _080ACDB4 @ =gUnknown_080DBA94
	ldr r1, [r4, #0xc]
	lsls r1, r1, #5
	adds r6, r6, r1
	ldrh r1, [r4, #8]
	movs r2, #0
	mov sl, r2
	movs r5, #0
	strh r1, [r0, #0xc]
	ldrb r1, [r4, #0xa]
	strb r1, [r0, #0x1a]
	movs r1, #0xff
	strb r1, [r0, #0x1b]
	ldr r1, [r7, #0x20]
	asrs r1, r1, #8
	strh r1, [r0, #0x10]
	ldr r1, [r7, #0x24]
	asrs r1, r1, #8
	strh r1, [r0, #0x12]
	movs r1, #0xa0
	lsls r1, r1, #1
	mov sb, r1
	mov r2, sb
	strh r2, [r0, #0x14]
	strh r5, [r0, #0xe]
	strh r5, [r0, #0x16]
	movs r1, #0x10
	mov r8, r1
	mov r2, r8
	strb r2, [r0, #0x1c]
	mov r1, sl
	strb r1, [r0, #0x1f]
	str r5, [r0, #8]
	bl UpdateSpriteAnimation
	adds r0, r7, #0
	adds r0, #0x84
	str r6, [r0]
	ldrh r1, [r4]
	strh r1, [r0, #0xc]
	ldrb r1, [r4, #2]
	strb r1, [r0, #0x1a]
	movs r1, #1
	rsbs r1, r1, #0
	strb r1, [r0, #0x1b]
	ldr r1, [r7, #0x20]
	asrs r1, r1, #8
	strh r1, [r0, #0x10]
	ldr r1, [r7, #0x24]
	asrs r1, r1, #8
	strh r1, [r0, #0x12]
	mov r2, sb
	strh r2, [r0, #0x14]
	strh r5, [r0, #0xe]
	strh r5, [r0, #0x16]
	mov r1, r8
	strb r1, [r0, #0x1c]
	mov r2, sl
	strb r2, [r0, #0x1f]
	str r5, [r0, #8]
	bl UpdateSpriteAnimation
	pop {r3, r4, r5}
	mov r8, r3
	mov sb, r4
	mov sl, r5
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_080ACDB4: .4byte gUnknown_080DBA94
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
