You are decompiling an assembly function called `sub_8022934` in ARMv4T from a Game Boy Advance game.

# Examples

## `sub_800EFB0`

```c
void sub_800EFB0(Player *p)
{
    Player *partner;
    u32 temp_r2;
    u32 temp_r2_2;
    u32 var_r2;

    partner = GET_SP_PLAYER_V1(PLAYER_2);
    temp_r2 = partner->moveState;
    temp_r2_2 = temp_r2 | 0x22000000;
    partner->moveState = temp_r2_2;
    if (p->moveState & 1) {
        partner->moveState |= 0x1;
    } else {
        partner->moveState &= ~1;
    }

    sub_801D978(partner);
    sub_800CD68(p);
}
```

```asm
         push {r4, lr}
         mov r4, r0
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x1c] # REFERENCE_.L34
         add r1, r0, r1
         ldr r2, [r1, #0x4]
         mov r0, #0x88
         lsl r0, #0x16
         orr r2, r0
         str r2, [r1, #0x4]
         ldr r0, [r4, #0x4]
         mov r3, #0x1
         and r0, r3
         cmp r0, #0x0
         beq .L3827
         orr r2, r3
         b .L3e30
         .hword 0x0
         .word gPlayers
     22mov r0, #0x2
         neg r0, r0
         and r2, r0
     24str r2, [r1, #0x4]
         mov r0, r1
         bl sub_801D978-0x4
         mov r0, r4
         bl sub_800CD68-0x4
         pop {r4}
         pop {r0}
         bx r0
```

## `sub_0800F004`

```c
void sub_0800F004(Player *p)
{
    Player *partner;

    partner = GET_SP_PLAYER_V1(PLAYER_2);
    if (p->moveState & 4) {
        partner->charFlags.anim0 = 0x10D;
        p->unk26 = 0;
        partner->unk26 = 0;
        sub_800D19C(p);
        sub_800D6EC(partner);
    } else {
        partner->charFlags.anim0 = 0x10C;
        sub_0800E8E0(p);
        sub_800D424(partner);
    }
}
```

```asm
         push {r4, lr}
         mov r2, r0
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x2c] # REFERENCE_.L44
         add r4, r0, r1
         ldr r0, [r2, #0x4]
         mov r1, #0x4
         and r0, r1
         cmp r0, #0x0
         beq .L4c34
         mov r1, #0x0
         ldr r0, [pc, #0x20] # REFERENCE_.L48
         strh r0, [r4, #0x30]
         mov r0, r2
         add r0, #0x26
         strb r1, [r0, #0x0]
         mov r0, r4
         add r0, #0x26
         strb r1, [r0, #0x0]
         mov r0, r2
         bl sub_800D19C-0x4
         mov r0, r4
         bl sub_800D6EC-0x4
         b .L5e41
         .word gPlayers
         .word 0x10d
     17mov r0, #0x86
         lsl r0, #0x1
         strh r0, [r4, #0x30]
         mov r0, r2
         bl sub_0800E8E0-0x4
         mov r0, r4
         bl sub_800D424-0x4
     31pop {r4}
         pop {r0}
         bx r0
```

## `sub_8004DD8`

```c
void sub_8004DD8(s32 qWorldX, s32 qWorldY)
{
    Player *p;
    s16 i;

    p = &gPlayers[PLAYER_1];
    for (i = 0; i < 4; i++, p++) {
        if ((p->charFlags.someIndex == 1) || (p->charFlags.someIndex == 4)) {
            sub_8005130(p, qWorldX, qWorldY);
        }
    }
}
```

```asm
         push {r4, r5, r6, r7, lr}
         mov r7, r0
         mov r6, r1
         ldr r4, [pc, #0x3c] # REFERENCE_.L44
         mov r5, #0x0
     28mov r0, r4
         add r0, #0x2b
         ldrb r0, [r0, #0x0]
         mov r1, #0x1c
         and r1, r0
         cmp r1, #0x4
         beq .L1c14
         cmp r1, #0x10
         bne .L2618
     11mov r0, r4
         mov r1, r7
         mov r2, r6
         bl sub_8005130-0x4
     13lsl r0, r5, #0x10
         mov r1, #0x80
         lsl r1, #0x9
         add r0, r1
         mov r1, #0xa8
         lsl r1, #0x1
         add r4, r1
         lsr r5, r0, #0x10
         asr r0, #0x10
         cmp r0, #0x3
         ble .La5
         pop {r4, r5, r6, r7}
         pop {r0}
         bx r0
         .hword 0x0
         .word gPlayers
```

## `sub_0800C338`

```c
void sub_0800C338(Player *p)
{
    Player *partner = GET_SP_PLAYER_V1(PLAYER_2);

    p->unk26 = 0;
    partner->unk26 = 0;
    sub_800CF08(p);
    partner->moveState |= 0x22000000;
    if (p->moveState & 1) {
        partner->moveState |= 0x1;
    } else {
        partner->moveState &= ~1;
    }

    partner->qWorldX = p->qWorldX;
    partner->qWorldY = p->qWorldY;
    partner->qSpeedAirY = -0x200;
    partner->charFlags.anim0 = 0xE7;
    sub_801D8A8(partner);
}
```

```asm
         push {r4, r5, lr}
         mov r5, r0
         add r0, #0x2b
         ldrb r1, [r0, #0x0]
         lsl r1, #0x1e
         lsr r1, #0x1e
         lsl r0, r1, #0x2
         add r0, r1
         lsl r0, #0x2
         add r0, r1
         lsl r0, #0x4
         ldr r1, [pc, #0x30] # REFERENCE_.L48
         add r4, r0, r1
         mov r1, r5
         add r1, #0x26
         mov r0, #0x0
         strb r0, [r1, #0x0]
         mov r1, r4
         add r1, #0x26
         strb r0, [r1, #0x0]
         mov r0, r5
         bl sub_800CF08-0x4
         ldr r1, [r4, #0x4]
         mov r0, #0x88
         lsl r0, #0x16
         orr r1, r0
         str r1, [r4, #0x4]
         ldr r0, [r5, #0x4]
         mov r2, #0x1
         and r0, r2
         cmp r0, #0x0
         beq .L4c36
         orr r1, r2
         b .L5239
         .hword 0x0
         .word gPlayers
     31mov r0, #0x2
         neg r0, r0
         and r1, r0
     33str r1, [r4, #0x4]
         ldr r0, [r5, #0x10]
         str r0, [r4, #0x10]
         ldr r0, [r5, #0x14]
         str r0, [r4, #0x14]
         mov r0, #0xfe
         lsl r0, #0x8
         strh r0, [r4, #0x1a]
         mov r0, #0xe7
         strh r0, [r4, #0x30]
         mov r0, r4
         bl sub_801D8A8-0x4
         pop {r4, r5}
         pop {r0}
         bx r0
```

## `Player_801D73C`

```c
void Player_801D73C(Player *p)
{
    if (--p->idleAndCamCounter == 0) {
        Player *partner = GET_SP_PLAYER_V1(PLAYER_2);
        if (partner->moveState & 1) {
            p->qSpeedAirX = -Q(7);
        } else {
            p->qSpeedAirX = +Q(7);
        }

        p->qSpeedAirY = -0x200;
        p->moveState |= 4;
        p->charFlags.anim0 = 0x14;
        p->charFlags.anim2 = 0x1FC;
        p->charFlags.state1 = 1;
        SetPlayerCallback(p, Player_801DF18);
    }
}
```

```asm
         push {lr}
         mov r2, r0
         mov r1, r2
         add r1, #0x52
         ldrh r0, [r1, #0x0]
         sub r0, #0x1
         strh r0, [r1, #0x0]
         lsl r0, #0x10
         cmp r0, #0x0
         bne .L6a51
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
         ldr r1, [pc, #0x10] # REFERENCE_.L3c
         add r0, r1
         ldr r0, [r0, #0x4]
         mov r1, #0x1
         and r0, r1
         cmp r0, #0x0
         beq .L4031
         mov r0, #0xf9
         lsl r0, #0x8
         b .L4433
         .word gPlayers
     26mov r0, #0xe0
         lsl r0, #0x3
     29strh r0, [r2, #0x18]
         mov r0, #0xfe
         lsl r0, #0x8
         strh r0, [r2, #0x1a]
         ldr r0, [r2, #0x4]
         mov r1, #0x4
         orr r0, r1
         str r0, [r2, #0x4]
         mov r0, #0x14
         strh r0, [r2, #0x30]
         mov r0, #0xfe
         lsl r0, #0x1
         strh r0, [r2, #0x34]
         mov r0, #0x1
         strh r0, [r2, #0x36]
         ldr r1, [pc, #0xc] # REFERENCE_.L70
         mov r0, r2
         bl SetPlayerCallback-0x4
     9pop {r0}
         bx r0
         .hword 0x0
         .word Player_801DF18
```

# Primary Objective

Decompile the following target assembly function from `asm/code_0_2.s` into clean, readable C code that compiles to an assembly matching EXACTLY the original one.

```asm
	thumb_func_start sub_8022934
sub_8022934: @ 0x08022934
	push {lr}
	lsls r0, r0, #0x10
	asrs r0, r0, #0x10
	lsls r1, r0, #2
	adds r1, r1, r0
	lsls r1, r1, #2
	adds r1, r1, r0
	lsls r1, r1, #4
	ldr r0, _0802296C @ =gPlayers
	adds r1, r1, r0
	adds r1, #0xe0
	ldr r0, [r1]
	adds r1, r0, #0
	adds r1, #0xc
	ldrh r0, [r1, #0x10]
	subs r0, #1
	lsls r0, r0, #0x10
	lsrs r0, r0, #0x10
	cmp r0, #0xee
	bhi _08022970
	movs r2, #0x12
	ldrsh r0, [r1, r2]
	cmp r0, #0
	ble _08022970
	cmp r0, #0x9f
	bgt _08022970
	movs r0, #1
	b _08022972
	.align 2, 0
_0802296C: .4byte gPlayers
_08022970:
	movs r0, #0
_08022972:
	pop {r1}
	bx r1
	.align 2, 0
```

# Rules

- In order to decompile this function, you may need to create new types. Include them on the result.

- SHOW THE ENTIRE CODE WITHOUT CROPPING.
