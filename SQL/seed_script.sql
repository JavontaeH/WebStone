use [CardCapstone];
GO


set identity_insert [UserProfile] on 
insert into [UserProfile] ([Id], [DisplayName], [Email], [FirebaseUserId])
values (1, 'admin', 'admin@email.com', 'hmEn13uyI8Xgl1j4bQPHbCN25mW2')
set identity_insert [UserProfile] off


set identity_insert [CardType] on 
insert into [CardType] ([Id], [Name])
values (1, 'Normal')
set identity_insert [CardType] off


set identity_insert [Card] on 
insert into [Card] ([Id], [Name],  [ImageLocation], [Description], [Hp], [Atk], [Mana], [CardTypeId])
values (1, 'temp card', 'not_implemented', 'temp card info', 4, 5, 4, 1), (2, 'Kabal Crystal Runner', 'https://cdn.pastemagazine.com/www/system/images/photo_albums/hearthstone-card-art/large/25.jpg?1384968217', 'Costs (2) less for each secret youve played this game.', 5, 5, 6, 1)
set identity_insert [Card] off

set identity_insert [Deck] on 
insert into [Deck] ([Id], [Name], [DeckCode], [UserId])
values (1, 'temp deck', '12345-admin', 1)
set identity_insert [Deck] off

set identity_insert [DeckCards] on 
insert into [DeckCards] ([Id], [DeckId], [CardId])
values (1, 1, 1)
set identity_insert [DeckCards] off

set identity_insert [UserCards] on 
insert into [UserCards] ([Id], [UserId], [CardId])
values (1, 1, 1)
set identity_insert [UserCards] off
