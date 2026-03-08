You are decompiling an assembly function called `sub_8087A48` in ARMv4T from a Game Boy Advance game.

# Examples

## `CharSelect_InitBackgrounds`

```c
void CharSelect_InitBackgrounds(CharacterSelect *cs)
{
    Background *bgA;
    Background *bgB;
    Background *bgC;

    gBgCntRegs[0] = 0x4E07;
    gBgScrollRegs[0][0] = 0;
    gBgScrollRegs[0][1] = 0;
    bgA = &cs->bg1B4;
    bgA->graphics.dest = (void *)BG_SCREEN_ADDR(8);
    bgA->graphics.anim = 0;
    bgA->layoutVram = (void *)BG_SCREEN_ADDR(14);
    bgA->unk18 = 0;
    bgA->unk1A = 0;
    bgA->tilemapId = gUnknown_080D8CDC[0];
    bgA->unk1E = 0;
    bgA->unk20 = 0;
    bgA->unk22 = 0;
    bgA->unk24 = 0;
    bgA->targetTilesX = 45;
    bgA->targetTilesY = 20;
    cs->bg1B4.paletteOffset = 0;
    bgA->flags = 0;
    DrawBackground(bgA);

    gBgCntRegs[1] = 0x30E;
    gBgScrollRegs[1][0] = 0;
    gBgScrollRegs[1][1] = 0;
    bgB = &cs->bg1F4;
    bgB->graphics.dest = (void *)BG_SCREEN_ADDR(24);
    bgB->graphics.anim = 0;
    bgB->layoutVram = (void *)BG_SCREEN_ADDR(3);
    bgB->unk18 = 0;
    bgB->unk1A = 0;
    bgB->tilemapId = gUnknown_080D8CDC[11];
    bgB->unk1E = 0;
    bgB->unk20 = 0;
    bgB->unk22 = 0;
    bgB->unk24 = 0;
    bgB->targetTilesX = 16;
    bgB->targetTilesY = 16;
    cs->bg1F4.paletteOffset = 0;
    bgB->flags = 1;
    DrawBackground(bgB);

    gBgCntRegs[2] = 0x1B89;
    gBgScrollRegs[2][0] = 0;
    gBgScrollRegs[2][1] = 0;
    bgC = &cs->bg234;
    bgC->graphics.dest = (void *)BG_SCREEN_ADDR(16);
    bgC->graphics.anim = 0;
    bgC->layoutVram = (void *)BG_SCREEN_ADDR(27);
    bgC->unk18 = 0;
    bgC->unk1A = 0;
    bgC->tilemapId = gUnknown_080D8CDC[cs->unk5 + 5];
    bgC->unk1E = 0;
    bgC->unk20 = 0;
    bgC->unk22 = 0;
    bgC->unk24 = 0;
    bgC->targetTilesX = 16;
    bgC->targetTilesY = 16;
    bgC->paletteOffset = 0;
    bgC->flags = 6;
    DrawBackground(bgC);
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r10
         mov r6, r9
         mov r5, r8
         push {r5, r6, r7}
         mov r7, r0
         ldr r0, [pc, #0xe4] # REFERENCE_.Lf4
         mov r9, r0
         mov r1, #0x0
         mov r10, r1
         mov r4, #0x0
         ldr r0, [pc, #0xe0] # REFERENCE_.Lf8
         mov r2, r9
         strh r0, [r2, #0x0]
         ldr r6, [pc, #0xdc] # REFERENCE_.Lfc
         strh r4, [r6, #0x0]
         strh r4, [r6, #0x2]
         mov r1, #0xda
         lsl r1, #0x1
         add r0, r7, r1
         ldr r1, [pc, #0xd4] # REFERENCE_.L100
         str r1, [r0, #0x4]
         strh r4, [r0, #0xa]
         ldr r1, [pc, #0xd4] # REFERENCE_.L104
         str r1, [r0, #0xc]
         strh r4, [r0, #0x18]
         strh r4, [r0, #0x1a]
         ldr r2, [pc, #0xd0] # REFERENCE_.L108
         mov r8, r2
         ldrh r1, [r2, #0x0]
         strh r1, [r0, #0x1c]
         strh r4, [r0, #0x1e]
         strh r4, [r0, #0x20]
         strh r4, [r0, #0x22]
         strh r4, [r0, #0x24]
         mov r1, #0x2d
         strh r1, [r0, #0x26]
         mov r1, #0x14
         strh r1, [r0, #0x28]
         mov r2, #0xef
         lsl r2, #0x1
         add r1, r7, r2
         mov r2, r10
         strb r2, [r1, #0x0]
         strh r4, [r0, #0x2e]
         bl DrawBackground-0x4
         ldr r0, [pc, #0xac] # REFERENCE_.L10c
         mov r1, r9
         strh r0, [r1, #0x2]
         strh r4, [r6, #0x4]
         strh r4, [r6, #0x6]
         mov r2, #0xfa
         lsl r2, #0x1
         add r0, r7, r2
         ldr r1, [pc, #0xa0] # REFERENCE_.L110
         str r1, [r0, #0x4]
         strh r4, [r0, #0xa]
         ldr r1, [pc, #0x9c] # REFERENCE_.L114
         str r1, [r0, #0xc]
         strh r4, [r0, #0x18]
         strh r4, [r0, #0x1a]
         mov r2, r8
         ldrh r1, [r2, #0x16]
         strh r1, [r0, #0x1c]
         strh r4, [r0, #0x1e]
         strh r4, [r0, #0x20]
         strh r4, [r0, #0x22]
         strh r4, [r0, #0x24]
         mov r5, #0x10
         strh r5, [r0, #0x26]
         strh r5, [r0, #0x28]
         ldr r2, [pc, #0x84] # REFERENCE_.L118
         add r1, r7, r2
         mov r2, r10
         strb r2, [r1, #0x0]
         mov r1, #0x1
         strh r1, [r0, #0x2e]
         bl DrawBackground-0x4
         ldr r0, [pc, #0x78] # REFERENCE_.L11c
         mov r1, r9
         strh r0, [r1, #0x4]
         strh r4, [r6, #0x8]
         strh r4, [r6, #0xa]
         mov r2, #0x8d
         lsl r2, #0x2
         add r0, r7, r2
         ldr r1, [pc, #0x6c] # REFERENCE_.L120
         str r1, [r0, #0x4]
         strh r4, [r0, #0xa]
         ldr r1, [pc, #0x6c] # REFERENCE_.L124
         str r1, [r0, #0xc]
         strh r4, [r0, #0x18]
         strh r4, [r0, #0x1a]
         ldrb r1, [r7, #0x5]
         add r1, #0x5
         lsl r1, #0x1
         add r1, r8
         ldrh r1, [r1, #0x0]
         strh r1, [r0, #0x1c]
         strh r4, [r0, #0x1e]
         strh r4, [r0, #0x20]
         strh r4, [r0, #0x22]
         strh r4, [r0, #0x24]
         strh r5, [r0, #0x26]
         strh r5, [r0, #0x28]
         add r2, #0x2a
         add r1, r7, r2
         mov r2, r10
         strb r2, [r1, #0x0]
         mov r1, #0x6
         strh r1, [r0, #0x2e]
         bl DrawBackground-0x4
         pop {r3, r4, r5}
         mov r8, r3
         mov r9, r4
         mov r10, r5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .word gBgCntRegs
         .word 0x4e07
         .word gBgScrollRegs
         .word 0x6004000
         .word 0x6007000
         .word gUnknown_080D8CDC
         .word 0x30e
         .word 0x600c000
         .word 0x6001800
         .word 0x21e
         .word 0x1b89
         .word 0x6008000
         .word 0x600d800
```

## `sub_80990B0`

```c
void sub_80990B0(CharacterSelect *cs)
{
    Background *bg;
    u16 *var_r0_2;
    u16 var_r0;
    u8 temp_r5;

    bg = &cs->bg234;
    temp_r5 = gUnknown_080D8F18[cs->unk5];
    bg->graphics.dest = (void *)(BG_VRAM + 0x8000);
    bg->graphics.anim = 0;
    bg->layoutVram = (void *)(BG_VRAM + 0xD800);
    bg->unk18 = 0;
    bg->unk1A = 0;

    if (!(LOADED_SAVE->unlockedCharacters & gUnknown_080D946D[temp_r5])) {
        bg->tilemapId = gUnknown_080D8CDC[16];
    } else {
        bg->tilemapId = gUnknown_080D8CDC[temp_r5 + 5];
    }

    bg->unk1E = 0;
    bg->unk20 = 0;
    bg->unk22 = 0;
    bg->unk24 = 0;
    bg->targetTilesX = 16;
    bg->targetTilesY = 16;
    bg->paletteOffset = 0;
    bg->flags = 6;
    DrawBackground(bg);

    cs->qUnk40 = 0x5000;
    cs->unkB = 4;
    if (!(LOADED_SAVE->unlockedCharacters & gUnknown_080D946D[temp_r5])) {
        if (FLAGS_20000 & gFlags) {
            CopyPalette(&gUnknown_08E2EEF0[0], 0x60U, 16);
        } else {
            DmaCopy16(3, &gUnknown_08E2EEF0[0], &gObjPalette[3 * (16 * sizeof(u16))], 0x20U);
            gFlags |= FLAGS_UPDATE_SPRITE_PALETTES;
        }
    } else if (FLAGS_20000 & gFlags) {
        CopyPalette(&gUnknown_08E2EE50[temp_r5][0], 3 * (16 * sizeof(u16)), ARRAY_COUNT(gUnknown_08E2EE50[temp_r5]));
    } else {
        DmaCopy16(3, &gUnknown_08E2EE50[temp_r5][0], &gObjPalette[3 * (16 * sizeof(u16))], (16 * sizeof(u16)));
        gFlags |= FLAGS_UPDATE_SPRITE_PALETTES;
    }
    gFlags |= FLAGS_UPDATE_SPRITE_PALETTES;
}
```

```asm
         push {r4, r5, lr}
         mov r4, r0
         mov r0, #0x8d
         lsl r0, #0x2
         add r2, r4, r0
         ldr r1, [pc, #0x2c] # REFERENCE_.L38
         ldrb r0, [r4, #0x5]
         add r0, r1
         ldrb r5, [r0, #0x0]
         ldr r0, [pc, #0x28] # REFERENCE_.L3c
         str r0, [r2, #0x4]
         mov r1, #0x0
         strh r1, [r2, #0xa]
         ldr r0, [pc, #0x24] # REFERENCE_.L40
         str r0, [r2, #0xc]
         strh r1, [r2, #0x18]
         strh r1, [r2, #0x1a]
         ldr r1, [pc, #0x20] # REFERENCE_.L44
         ldr r0, [pc, #0x20] # REFERENCE_.L48
         add r0, r5, r0
         ldrb r1, [r1, #0x10]
         ldrb r0, [r0, #0x0]
         and r0, r1
         cmp r0, #0x0
         bne .L5034
         ldr r0, [pc, #0x18] # REFERENCE_.L4c
         ldrh r0, [r0, #0x20]
         b .L5a39
         .word gUnknown_080D8F18
         .word 0x6008000
         .word 0x600d800
         .word gLoadedSaveGame
         .word gUnknown_080D946D
         .word gUnknown_080D8CDC
     24ldr r0, [pc, #0x58] # REFERENCE_.Lac
         add r1, r5, #0x5
         lsl r1, #0x1
         add r1, r0
         ldrh r0, [r1, #0x0]
     27strh r0, [r2, #0x1c]
         mov r1, #0x0
         mov r0, #0x0
         strh r0, [r2, #0x1e]
         strh r0, [r2, #0x20]
         strh r0, [r2, #0x22]
         strh r0, [r2, #0x24]
         mov r0, #0x10
         strh r0, [r2, #0x26]
         strh r0, [r2, #0x28]
         mov r0, r2
         add r0, #0x2a
         strb r1, [r0, #0x0]
         mov r0, #0x6
         strh r0, [r2, #0x2e]
         mov r0, r2
         bl DrawBackground-0x4
         mov r0, #0xa0
         lsl r0, #0x7
         str r0, [r4, #0x40]
         mov r0, #0x4
         strb r0, [r4, #0xb]
         ldr r1, [pc, #0x24] # REFERENCE_.Lb0
         ldr r0, [pc, #0x28] # REFERENCE_.Lb4
         add r0, r5, r0
         ldrb r1, [r1, #0x10]
         ldrb r0, [r0, #0x0]
         and r0, r1
         cmp r0, #0x0
         bne .Le8100
         ldr r3, [pc, #0x1c] # REFERENCE_.Lb8
         ldr r2, [r3, #0x0]
         mov r0, #0x80
         lsl r0, #0xa
         and r0, r2
         cmp r0, #0x0
         beq .Lc084
         ldr r0, [pc, #0x14] # REFERENCE_.Lbc
         b .Lfc110
         .hword 0x0
         .word gUnknown_080D8CDC
         .word gLoadedSaveGame
         .word gUnknown_080D946D
         .word gFlags
         .word gUnknown_08E2EEF0
     75ldr r1, [pc, #0x14] # REFERENCE_.Ld8
         ldr r0, [pc, #0x18] # REFERENCE_.Ldc
         str r0, [r1, #0x0]
         ldr r0, [pc, #0x18] # REFERENCE_.Le0
         str r0, [r1, #0x4]
         ldr r0, [pc, #0x18] # REFERENCE_.Le4
         str r0, [r1, #0x8]
         ldr r0, [r1, #0x8]
         mov r0, #0x2
         orr r2, r0
         str r2, [r3, #0x0]
         b .L12a130
         .word 0x40000d4
         .word gUnknown_08E2EEF0
         .word gObjPalette+0xc0
         .word 0x80000010
     68ldr r4, [pc, #0x1c] # REFERENCE_.L108
         ldr r3, [r4, #0x0]
         mov r0, #0x80
         lsl r0, #0xa
         and r0, r3
         cmp r0, #0x0
         beq .L110117
         lsl r0, r5, #0x5
         ldr r1, [pc, #0x10] # REFERENCE_.L10c
         add r0, r1
     77mov r1, #0x60
         mov r2, #0x10
         bl CopyPalette-0x4
         b .L12a130
         .hword 0x0
         .word gFlags
         .word gUnknown_08E2EE50
     106ldr r2, [pc, #0x28] # REFERENCE_.L13c
         lsl r0, r5, #0x5
         ldr r1, [pc, #0x28] # REFERENCE_.L140
         add r0, r1
         str r0, [r2, #0x0]
         ldr r0, [pc, #0x28] # REFERENCE_.L144
         str r0, [r2, #0x4]
         ldr r0, [pc, #0x28] # REFERENCE_.L148
         str r0, [r2, #0x8]
         ldr r0, [r2, #0x8]
         mov r0, #0x2
         orr r3, r0
         str r3, [r4, #0x0]
     95ldr r0, [pc, #0x20] # REFERENCE_.L14c
         ldr r1, [r0, #0x0]
         mov r2, #0x2
         orr r1, r2
         str r1, [r0, #0x0]
         pop {r4, r5}
         pop {r0}
         bx r0
         .hword 0x0
         .word 0x40000d4
         .word gUnknown_08E2EE50
         .word gObjPalette+0xc0
         .word 0x80000010
         .word gFlags
```

## `sub_8050440`

```c
void sub_8050440() { }
```

```asm
         push {r4, lr}
         ldr r1, [pc, #0x50] # REFERENCE_.L54
         mov r0, #0x0
         strh r0, [r1, #0x0]
         strh r0, [r1, #0x2]
         strh r0, [r1, #0xc]
         strh r0, [r1, #0xe]
         ldr r0, [pc, #0x48] # REFERENCE_.L58
         mov r2, r0
         add r2, #0xc4
         ldr r1, [pc, #0x44] # REFERENCE_.L5c
         str r1, [r2, #0x0]
         add r2, #0x8
         ldr r1, [pc, #0x44] # REFERENCE_.L60
         str r1, [r2, #0x0]
         ldr r2, [pc, #0x44] # REFERENCE_.L64
         ldr r1, [pc, #0x44] # REFERENCE_.L68
         strh r1, [r2, #0x6]
         ldr r1, [pc, #0x44] # REFERENCE_.L6c
         str r1, [r0, #0x4]
         ldr r1, [pc, #0x44] # REFERENCE_.L70
         str r1, [r0, #0xc]
         ldr r4, [pc, #0x44] # REFERENCE_.L74
         ldr r3, [pc, #0x48] # REFERENCE_.L78
         mov r1, r3
         ldrb r3, [r4, #0x0]
         add r1, r3
         strh r1, [r0, #0x1c]
         ldr r1, [pc, #0x40] # REFERENCE_.L7c
         strh r1, [r2, #0x0]
         bl DrawBackground-0x4
         ldrh r1, [r4, #0x10]
         mov r2, #0x80
         lsl r2, #0x1
         mov r0, r2
         orr r0, r1
         strh r0, [r4, #0x10]
         pop {r4}
         pop {r0}
         bx r0
         .hword 0x0
         .word gBgScrollRegs
         .word gUnknown_03001D80
         .word 0x600c000
         .word 0x600e800
         .word gBgCntRegs
         .word 0x1d0e
         .word 0x6008000
         .word 0x600e000
         .word gStageData
         .word 0x1b9
         .hword 0x1c08
```

# Declarations for the functions called from the target assembly

- `void DrawBackground(Background *);`

# Types definitions used in the declarations

```c
typedef struct {
    /* 0x00 */ struct GraphicsData graphics;

    // 'tilesVram' points to tile-index array in VRAM, telling the GBA which tiles
    // to draw on this BG
    //
    // (!!! Data likely different depending on type of Background (Affine vs.
    // Text). !!!)
    //
    // Data-Structure (16 bits): MSB > PPPPYXTTTTTTTTTT < LSB
    // P = Palette Index
    // Y = Y-Flip
    // X = X-Flip
    // T = Tile-Index
    //
    // NOTE: It does NOT point to the tileset!
    /* 0x0C */ u16 *layoutVram;

    // Stage-Map: Metatiles
    // Common Tilemaps: Tilemap-Tiles
    /* 0x10 */ const u16 *layout;

    // Tile-count on each axis
    // - Stage maps: should be 12 (# per metatile)
    // - Common Tilemaps: should be .targetTilesX/Y
    /* 0x14 */ u16 xTiles;
    /* 0x16 */ u16 yTiles;

    /* 0x18 */ u16 unk18;
    /* 0x1A */ u16 unk1A;
    /* 0x1C */ u16 tilemapId;
    /* 0x1E */ u16 unk1E;

    /* 0x20 */ u16 unk20;
    /* 0x22 */ u16 unk22;
    /* 0x24 */ u16 unk24;

    /* Tile-Dimensions for the rendering target */
    /* - Stage maps: DISPLAY_WIDTH/_HEIGHT + 1*TILE_WIDTH */
    /* - Common Tilemaps: full image dimensions */
    /* 0x26 */ u16 targetTilesX;
    /* 0x28 */ u16 targetTilesY;

    /* 0x2A */ u8 paletteOffset;
    /* 0x2B */ u8 animFrameCounter;
    /* 0x2C */ u8 animDelayCounter;

    /* 0x2E */ u16 flags;

    // apparently NOT signed?
    /* 0x30 */ u16 scrollX;
    /* 0x32 */ u16 scrollY;
    /* 0x34 */ u16 prevScrollX;
    /* 0x36 */ u16 prevScrollY;

    /* Only used by stage maps (they are encoded as Tilemaps) */
    /* 0x38 */ const u16 *metatileMap;
    /* 0x3C */ u16 mapWidth;
    /* 0x3E */ u16 mapHeight;
} Background;
```

# Primary Objective

Decompile the following target assembly function from `asm/code.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8087A48
sub_8087A48: @ 0x08087A48
	push {r4, r5, r6, r7, lr}
	mov r7, r8
	push {r7}
	adds r7, r0, #0
	ldr r6, _08087B08 @ =gBgCntRegs
	movs r0, #0
	mov r8, r0
	movs r4, #0
	ldr r0, _08087B0C @ =0x00004E07
	strh r0, [r6]
	ldr r5, _08087B10 @ =gBgScrollRegs
	strh r4, [r5]
	strh r4, [r5, #2]
	movs r1, #0xcc
	lsls r1, r1, #2
	adds r0, r7, r1
	ldr r1, _08087B14 @ =0x06004000
	str r1, [r0, #4]
	strh r4, [r0, #0xa]
	ldr r1, _08087B18 @ =0x06007000
	str r1, [r0, #0xc]
	strh r4, [r0, #0x18]
	strh r4, [r0, #0x1a]
	ldr r1, _08087B1C @ =0x00000157
	strh r1, [r0, #0x1c]
	strh r4, [r0, #0x1e]
	strh r4, [r0, #0x20]
	strh r4, [r0, #0x22]
	strh r4, [r0, #0x24]
	movs r1, #0x40
	strh r1, [r0, #0x26]
	movs r1, #0x14
	strh r1, [r0, #0x28]
	ldr r2, _08087B20 @ =0x0000035A
	adds r1, r7, r2
	mov r3, r8
	strb r3, [r1]
	strh r4, [r0, #0x2e]
	bl DrawBackground
	ldr r0, _08087B24 @ =0x00000601
	strh r0, [r6, #2]
	strh r4, [r5, #4]
	strh r4, [r5, #6]
	movs r1, #0xec
	lsls r1, r1, #2
	adds r0, r7, r1
	movs r1, #0xc0
	lsls r1, r1, #0x13
	str r1, [r0, #4]
	strh r4, [r0, #0xa]
	ldr r1, _08087B28 @ =0x06003000
	str r1, [r0, #0xc]
	strh r4, [r0, #0x18]
	strh r4, [r0, #0x1a]
	movs r1, #0xac
	lsls r1, r1, #1
	strh r1, [r0, #0x1c]
	strh r4, [r0, #0x1e]
	strh r4, [r0, #0x20]
	strh r4, [r0, #0x22]
	strh r4, [r0, #0x24]
	movs r1, #0x20
	strh r1, [r0, #0x26]
	strh r1, [r0, #0x28]
	ldr r2, _08087B2C @ =0x000003DA
	adds r1, r7, r2
	mov r3, r8
	strb r3, [r1]
	movs r1, #1
	strh r1, [r0, #0x2e]
	bl DrawBackground
	ldr r0, _08087B30 @ =0x0000188A
	strh r0, [r6, #4]
	strh r4, [r5, #8]
	strh r4, [r5, #0xa]
	movs r0, #0xdc
	lsls r0, r0, #2
	adds r2, r7, r0
	ldr r0, _08087B34 @ =0x06008000
	str r0, [r2, #4]
	strh r4, [r2, #0xa]
	ldr r0, _08087B38 @ =0x0600C000
	str r0, [r2, #0xc]
	strh r4, [r2, #0x18]
	strh r4, [r2, #0x1a]
	ldrb r0, [r7, #1]
	subs r0, #2
	lsls r0, r0, #0x18
	lsrs r0, r0, #0x18
	cmp r0, #1
	bhi _08087B40
	ldr r0, _08087B3C @ =gUnknown_080D66C4
	ldrh r0, [r0, #4]
	b _08087B4C
	.align 2, 0
_08087B08: .4byte gBgCntRegs
_08087B0C: .4byte 0x00004E07
_08087B10: .4byte gBgScrollRegs
_08087B14: .4byte 0x06004000
_08087B18: .4byte 0x06007000
_08087B1C: .4byte 0x00000157
_08087B20: .4byte 0x0000035A
_08087B24: .4byte 0x00000601
_08087B28: .4byte 0x06003000
_08087B2C: .4byte 0x000003DA
_08087B30: .4byte 0x0000188A
_08087B34: .4byte 0x06008000
_08087B38: .4byte 0x0600C000
_08087B3C: .4byte gUnknown_080D66C4
_08087B40:
	ldr r0, _08087B7C @ =gUnknown_080D66C4
	movs r3, #0x10
	ldrsh r1, [r7, r3]
	lsls r1, r1, #1
	adds r1, r1, r0
	ldrh r0, [r1]
_08087B4C:
	strh r0, [r2, #0x1c]
	movs r1, #0
	movs r0, #0
	strh r0, [r2, #0x1e]
	strh r0, [r2, #0x20]
	strh r0, [r2, #0x22]
	strh r0, [r2, #0x24]
	movs r0, #0x10
	strh r0, [r2, #0x26]
	strh r0, [r2, #0x28]
	adds r0, r2, #0
	adds r0, #0x2a
	strb r1, [r0]
	movs r0, #6
	strh r0, [r2, #0x2e]
	adds r0, r2, #0
	bl DrawBackground
	pop {r3}
	mov r8, r3
	pop {r4, r5, r6, r7}
	pop {r0}
	bx r0
	.align 2, 0
_08087B7C: .4byte gUnknown_080D66C4
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
