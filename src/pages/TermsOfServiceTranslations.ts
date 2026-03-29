import { type LanguageCode } from '../utils/languageManager'

export const TERMS_TRANSLATIONS: Record<LanguageCode, {
  meta: {
    title: string
    description: string
  }
  hero: {
    title: string
  }
  intro: string
  sections: {
    howToOrder: {
      title: string
      ordering: {
        title: string
        description: string
      }
      service: {
        title: string
        description: string
      }
      production: {
        title: string
        description: string
      }
      support: {
        title: string
        description: string
      }
    }
    payment: {
      title: string
      deposit: {
        title: string
        description: string
      }
      balancePayment: {
        title: string
        description: string
      }
    }
    shipping: {
      title: string
      jabodetabek: {
        title: string
        days: string
      }
      outsideJava: {
        title: string
        days: string
      }
      international: {
        title: string
        days: string
      }
      note1: string
      note2: string
    }
    warranty: {
      title: string
      badge: string
      whatsCovered: {
        title: string
        description: string
      }
      notCovered: {
        title: string
        description: string
      }
      note: {
        title: string
        description: string
      }
    }
    findUs: {
      title: string
      workshopLabel: string
      workHours: string
      languages: string
    }
  }
}> = {
  id: {
    meta: {
      title: 'Syarat dan Ketentuan - Naturra Extal',
      description: 'Syarat dan ketentuan layanan Naturra Extal untuk ekspor komoditas pertanian premium'
    },
    hero: {
      title: 'Syarat dan Ketentuan'
    },
    intro: 'Syarat dan ketentuan layanan Naturra Extal untuk ekspor komoditas pertanian premium',
    sections: {
      howToOrder: {
        title: 'Cara Pemesanan',
        ordering: {
          title: 'Pemesanan',
          description: 'Pemesanan bisa langsung datang ke workshop kami di Bekasi atau melalui online dengan komunikasi via chat WhatsApp atau telepon ke nomor yang kami sediakan.'
        },
        service: {
          title: 'Layanan',
          description: 'Jika produk yang diorder custom design, silahkan ajukan design kepada kami untuk kami pelajari. Akan lebih baik disertai gambar kerja.'
        },
        production: {
          title: 'Produksi',
          description: 'Setelah negosiasi dan sudah deal kesepakatan harga akan kami buatkan PO Invoice detail order anda.'
        },
        support: {
          title: 'Support',
          description: 'Proses pengerjaan barang pre order kurang lebih 2-4 minggu tergantung design dan jumlah barang, akan kami update melalui Chat WhatsApp atau Email.'
        }
      },
      payment: {
        title: 'Pembayaran',
        deposit: {
          title: 'Deposit',
          description: 'Pengerjaan barang akan kami mulai setelah kami menerima deposit minimal 40% dari jumlah belanja atau atas kesepakatan bersama'
        },
        balancePayment: {
          title: 'Pelunasan',
          description: 'Untuk provinsi pulau Jawa dan DKI Jakarta, pelunasan dengan jumlah tertentu dapat dibayar pada saat barang sudah sampai dengan menunjukkan bukti transfer kepada sopir yang mengantarkan barang. Untuk wilayah luar pulau Jawa, pelunasan dibayarkan pada saat barang sudah dipacking dan siap dikirimkan melalui jasa ekspedisi.'
        }
      },
      shipping: {
        title: 'Pengiriman Barang',
        jabodetabek: {
          title: 'Jabodetabek',
          days: '1-2 hari'
        },
        outsideJava: {
          title: 'Luar Pulau Jawa',
          days: '5-7 hari'
        },
        international: {
          title: 'Internasional',
          days: 'LCL/FCL'
        },
        note1: 'Harga belum termasuk ongkos pengiriman kecuali kesepakatan',
        note2: 'Pembatalan tidak dapat dilakukan setelah produksi dimulai'
      },
      warranty: {
        title: 'Garansi Produk',
        badge: '30 Hari Garansi',
        whatsCovered: {
          title: 'Yang Dijamin',
          description: 'Kesesuaian kualitas produk dan integritas kemasan sesuai spesifikasi'
        },
        notCovered: {
          title: 'Tidak Dijamin',
          description: 'Kerusakan akibat penanganan pihak ketiga, kondisi penyimpanan pembeli, atau degradasi alami selama transit'
        },
        note: {
          title: 'Catatan',
          description: 'Biaya pengambilan dan pengiriman tidak termasuk'
        }
      },
      findUs: {
        title: 'Find Us',
        workshopLabel: 'Workshop Bekasi:',
        workHours: 'Jam Kerja: 08.00 - 22.00 GMT +7',
        languages: 'Tersedia dalam Bahasa Indonesia atau English'
      }
    }
  },
  en: {
    meta: {
      title: 'Terms of Service - Naturra Extal',
      description: 'Terms of service for Naturra Extal premium agricultural commodity export orders'
    },
    hero: {
      title: 'Terms of Service'
    },
    intro: 'Terms of service for Naturra Extal premium agricultural commodity export orders',
    sections: {
      howToOrder: {
        title: 'How to Order',
        ordering: {
          title: 'Ordering',
          description: 'Orders can be placed by visiting our workshop in Bekasi or online through WhatsApp chat or phone calls to our provided number.'
        },
        service: {
          title: 'Service',
          description: 'If the ordered product is custom design, please submit the design to us for our review. It would be better accompanied by working drawings.'
        },
        production: {
          title: 'Production',
          description: 'After negotiation and price agreement, we will create a PO Invoice with your order details.'
        },
        support: {
          title: 'Support',
          description: 'Pre-order production process takes approximately 2-4 weeks depending on design and quantity, we will update via WhatsApp Chat or Email.'
        }
      },
      payment: {
        title: 'Payment',
        deposit: {
          title: 'Deposit',
          description: 'Production will begin after we receive a minimum deposit of 40% of the total purchase amount or by mutual agreement'
        },
        balancePayment: {
          title: 'Balance Payment',
          description: 'For Java Island provinces and DKI Jakarta, balance payment of certain amounts can be paid when the goods arrive by showing transfer proof to the delivery driver. For areas outside Java Island, balance payment is made when goods are packed and ready for shipment via expedition service.'
        }
      },
      shipping: {
        title: 'Product Shipping',
        jabodetabek: {
          title: 'Jabodetabek',
          days: '1-2 days'
        },
        outsideJava: {
          title: 'Outside Java Island',
          days: '5-7 days'
        },
        international: {
          title: 'International',
          days: 'LCL/FCL'
        },
        note1: 'Prices exclude shipping costs unless agreed upon',
        note2: 'Cancellation not allowed after production begins'
      },
      warranty: {
        title: 'Product Warranty',
        badge: '30 Days Warranty',
        whatsCovered: {
          title: 'What\'s Covered',
          description: 'Product quality compliance and packaging integrity according to specifications'
        },
        notCovered: {
          title: 'Not Covered',
          description: 'Damage due to third-party handling, buyer storage conditions, or natural degradation during transit'
        },
        note: {
          title: 'Note',
          description: 'Pickup and shipping costs not included'
        }
      },
      findUs: {
        title: 'Find Us',
        workshopLabel: 'Workshop Bekasi:',
        workHours: 'Work Hours: 08.00 am - 22.00 GMT +7',
        languages: 'Available in Bahasa Indonesia or English'
      }
    }
  },
  ar: {
    meta: {
      title: 'شروط الخدمة - مانغالا ليفينج',
      description: 'شروط الخدمة لطلبات الأثاث الصناعي الإسكandinavian المتميز من مانغالا ليفينج'
    },
    hero: {
      title: 'شروط الخدمة'
    },
    intro: 'شروط الخدمة لطلبات الأثاث الصناعي الإسكandinavian المتميز من مانغالا ليفينج',
    sections: {
      howToOrder: {
        title: 'كيفية الطلب',
        ordering: {
          title: 'الطلب',
          description: 'يمكن تقديم الطلبات بزيارة ورشتنا في بيكاسي أو عبر الإنترنت من خلال محادثة WhatsApp أو المكالمات الهاتفية إلى الرقم الذي نوفر.'
        },
        service: {
          title: 'الخدمة',
          description: 'إذا كان المنتج المطلوب بتصميم مخصص، يرجى إرسال التصميم إلينا للمراجعة. سيكون من الأفضل أن يكون مصحوبًا برسومات العمل.'
        },
        production: {
          title: 'الإنتاج',
          description: 'بعد التفاوض والاتفاق على السعر، سنقوم بإنشاء فاتورة PO مع تفاصيل طلبك.'
        },
        support: {
          title: 'الدعم',
          description: 'تستغرق عملية إنتاج الطلب المسبق حوالي 2-4 أسابيع اعتمادًا على التصميم والكمية، سنقوم بالتحديث عبر محادثة WhatsApp أو البريد الإلكتروني.'
        }
      },
      payment: {
        title: 'الدفع',
        deposit: {
          title: 'الوديعة',
          description: 'سيبدأ الإنتاج بعد أن نتلقى وديعَةً بحد أدنى 40% من إجمالي مبلغ الشراء أو بالاتفاق المتبادل'
        },
        balancePayment: {
          title: 'دفع الرصيد',
          description: 'لمحافظات جزيرة جاوة وجاكارتا، يمكن دفع رصيد بمبالغ معينة عند وصول البضائع من خلال إظهار إثبات التحويل لسائق التوصيل. للمناطق خارج جزيرة جاوة، يتم دفع الرصيد عند تعبئة البضائع واستعدادها للشحن عبر خدمة البعثة.'
        }
      },
      shipping: {
        title: 'شحن المنتج',
        jabodetabek: {
          title: 'جابوديتابيك',
          days: '1-2 يوم'
        },
        outsideJava: {
          title: 'خارج جزيرة جاوة',
          days: '5-7 أيام'
        },
        international: {
          title: 'دولي',
          days: 'LCL/FCL'
        },
        note1: 'الأسعار لا تشمل تكاليف الشحن إلا في حالة الاتفاق',
        note2: 'لا يُسمح بالإلغاء بعد بدء الإنتاج'
      },
      warranty: {
        title: 'ضمان المنتج',
        badge: 'ضمان 30 يومًا',
        whatsCovered: {
          title: 'ما يتم تغطيته',
          description: 'أضرار البناء الناتجة عن أخطاء الحرفية'
        },
        notCovered: {
          title: 'غير مغطى',
          description: 'النمل الأبيض، تغيرات اللون، بهتان القماش، تمدد الخشب الطبيعي'
        },
        note: {
          title: 'ملاحظة',
          description: 'تكاليف الاستلام والشحن غير مشمولة'
        }
      },
      findUs: {
        title: 'ابحث عنا',
        workshopLabel: 'ورشة بيكاسي:',
        workHours: 'ساعات العمل: 08:00 صباحًا - 22:00 بتوقيت GMT +7',
        languages: 'متاح باللغة الإندونيسية أو الإنجليزية'
      }
    }
  },
  zh: {
    meta: {
      title: '服务条款 - Naturra Extal',
      description: 'Naturra Extal 优质工业风斯堪的纳维亚家具订单的服务条款'
    },
    hero: {
      title: '服务条款'
    },
    intro: 'Naturra Extal 优质工业风斯堪的纳维亚家具订单的服务条款',
    sections: {
      howToOrder: {
        title: '如何订购',
        ordering: {
          title: '订购',
          description: '可以通过访问我们在 Bekasi 的工作室或通过 WhatsApp 聊天或拨打我们提供的电话号码在线下订单。'
        },
        service: {
          title: '服务',
          description: '如果订购的产品是定制设计，请将设计提交给我们审核。最好附上施工图。'
        },
        production: {
          title: '生产',
          description: '谈判并达成价格协议后，我们将为您创建包含订单详情的 PO 发票。'
        },
        support: {
          title: '支持',
          description: '预售生产过程大约需要 2-4 周，具体取决于设计和数量，我们将通过 WhatsApp 聊天或电子邮件更新。'
        }
      },
      payment: {
        title: '付款',
        deposit: {
          title: '定金',
          description: '在收到至少购买总金额 40% 的定金或双方同意后，我们将开始生产'
        },
        balancePayment: {
          title: '尾款',
          description: '对于爪哇岛省份和雅加达特区，可以在货物到达时通过向送货司机出示转账证明支付一定金额的尾款。对于爪哇岛以外的地区，尾款在货物包装好并准备通过货运服务发货时支付。'
        }
      },
      shipping: {
        title: '产品运输',
        jabodetabek: {
          title: '雅加达都市圈',
          days: '1-2 天'
        },
        outsideJava: {
          title: '爪哇岛以外',
          days: '5-7 天'
        },
        international: {
          title: '国际',
          days: 'LCL/FCL'
        },
        note1: '除非另有协议，价格不包括运费',
        note2: '生产开始后不允许取消'
      },
      warranty: {
        title: '产品保修',
        badge: '30 天保修',
        whatsCovered: {
          title: '保修范围',
          description: '由于工艺错误造成的结构损坏'
        },
        notCovered: {
          title: '不在保修范围内',
          description: '白蚁、颜色变化、面料褪色、自然木材膨胀'
        },
        note: {
          title: '备注',
          description: '不包括取货和运费'
        }
      },
      findUs: {
        title: '找到我们',
        workshopLabel: 'Bekasi 工作室：',
        workHours: '工作时间：08:00 - 22:00 GMT +7',
        languages: '提供印尼语或英语'
      }
    }
  },
  ja: {
    meta: {
      title: '利用規約 - Naturra Extal',
      description: 'Naturra Extal プレミアムインダストリアルスカンディナヴィアン家具注文の利用規約'
    },
    hero: {
      title: '利用規約'
    },
    intro: 'Naturra Extal プレミアムインダストリアルスカンディナヴィアン家具注文の利用規約',
    sections: {
      howToOrder: {
        title: '注文方法',
        ordering: {
          title: '注文',
          description: 'Bekasi のワークショップを訪問するか、提供された番号への WhatsApp チャットまたは電話を通じてオンラインで注文できます。'
        },
        service: {
          title: 'サービス',
          description: '注文した製品がカスタムデザインの場合、レビューのためにデザインを送信してください。作業図面を添付するとさらに良いでしょう。'
        },
        production: {
          title: '製造',
          description: '交渉と価格合意後、注文詳細を含む PO インボイスを作成します。'
        },
        support: {
          title: 'サポート',
          description: '予約注文の製造プロセスは、デザインと数量に応じて約 2-4 週間かかり、WhatsApp チャットまたはメールで更新します。'
        }
      },
      payment: {
        title: '支払い',
        deposit: {
          title: 'デポジット',
          description: '購入総額の最低 40% のデポジットを受け取るか、相互合意に基づいて製造を開始します'
        },
        balancePayment: {
          title: '残金支払い',
          description: 'ジャワ島の州とジャカルタ特別州の場合、一定額の残金は、配送ドライバーに送金証明を示すことで、商品到着時に支払うことができます。ジャワ島以外の地域の場合、残金は商品がパッキングされ、輸送サービスで出荷準備が整った時点で支払われます。'
        }
      },
      shipping: {
        title: '製品配送',
        jabodetabek: {
          title: 'ジャボデタベック',
          days: '1-2 日'
        },
        outsideJava: {
          title: 'ジャワ島外',
          days: '5-7 日'
        },
        international: {
          title: '国際',
          days: 'LCL/FCL'
        },
        note1: '合意がない限り、価格には配送料は含まれません',
        note2: '製造開始後のキャンセルは許可されません'
      },
      warranty: {
        title: '製品保証',
        badge: '30 日間保証',
        whatsCovered: {
          title: '保証内容',
          description: '職人技のエラーによる構造損傷'
        },
        notCovered: {
          title: '保証対象外',
          description: 'シロアリ、色の変化、生地の退色、自然な木材の膨張'
        },
        note: {
          title: '注意',
          description: '引き取りと配送料は含まれません'
        }
      },
      findUs: {
        title: '私たちを見つける',
        workshopLabel: 'Bekasi ワークショップ：',
        workHours: '営業時間：08:00 - 22:00 GMT +7',
        languages: 'インドネシア語または英語で利用可能'
      }
    }
  },
  es: {
    meta: {
      title: 'Términos de Servicio - Naturra Extal',
      description: 'Términos de servicio para pedidos de productos agrícolas premium de Naturra Extal'
    },
    hero: {
      title: 'Términos de Servicio'
    },
    intro: 'Términos de servicio para pedidos de productos agrícolas premium de Naturra Extal',
    sections: {
      howToOrder: {
        title: 'Cómo Pedir',
        ordering: {
          title: 'Pedidos',
          description: 'Los pedidos se pueden realizar visitando nuestro taller en Bekasi o en línea a través de chat de WhatsApp o llamadas telefónicas al número proporcionado.'
        },
        service: {
          title: 'Servicio',
          description: 'Si el producto pedido es diseño personalizado, por favor envíenos el diseño para nuestra revisión. Sería mejor acompañado de planos de trabajo.'
        },
        production: {
          title: 'Producción',
          description: 'Después de la negociación y acuerdo de precio, crearemos una factura PO con los detalles de su pedido.'
        },
        support: {
          title: 'Soporte',
          description: 'El proceso de producción de pedidos anticipados toma aproximadamente 2-4 semanas dependiendo del diseño y cantidad, actualizaremos vía Chat de WhatsApp o Email.'
        }
      },
      payment: {
        title: 'Pago',
        deposit: {
          title: 'Depósito',
          description: 'La producción comenzará después de recibir un depósito mínimo del 40% del monto total de compra o por acuerdo mutuo'
        },
        balancePayment: {
          title: 'Pago del Saldo',
          description: 'Para las provincias de la isla de Java y DKI Yakarta, el pago del saldo de ciertas cantidades se puede pagar cuando las mercancías lleguen mostrando la prueba de transferencia al conductor de entrega. Para áreas fuera de la isla de Java, el pago del saldo se realiza cuando las mercancías están empacadas y listas para envío vía servicio de expedición.'
        }
      },
      shipping: {
        title: 'Envío de Productos',
        jabodetabek: {
          title: 'Jabodetabek',
          days: '1-2 días'
        },
        outsideJava: {
          title: 'Fuera de la Isla de Java',
          days: '5-7 días'
        },
        international: {
          title: 'Internacional',
          days: 'LCL/FCL'
        },
        note1: 'Los precios excluyen costos de envío a menos que se acuerde',
        note2: 'No se permite la cancelación después de que comience la producción'
      },
      warranty: {
        title: 'Garantía del Producto',
        badge: 'Garantía de 30 Días',
        whatsCovered: {
          title: 'Lo Que Está Cubierto',
          description: 'Daños de construcción debido a errores de mano de obra'
        },
        notCovered: {
          title: 'No Cubierto',
          description: 'Termitas, cambios de color, desvanecimiento de tela, expansión natural de madera'
        },
        note: {
          title: 'Nota',
          description: 'Los costos de recogida y envío no están incluidos'
        }
      },
      findUs: {
        title: 'Encuéntranos',
        workshopLabel: 'Taller Bekasi:',
        workHours: 'Horario de Trabajo: 08:00 am - 22:00 GMT +7',
        languages: 'Disponible en Bahasa Indonesia o Inglés'
      }
    }
  },
  fr: {
    meta: {
      title: 'Conditions d\'Utilisation - Naturra Extal',
      description: 'Conditions d\'utilisation pour les commandes de mobilier scandinave industriel premium de Naturra Extal'
    },
    hero: {
      title: 'Conditions d\'Utilisation'
    },
    intro: 'Conditions d\'utilisation pour les commandes de mobilier scandinave industriel premium de Naturra Extal',
    sections: {
      howToOrder: {
        title: 'Comment Commander',
        ordering: {
          title: 'Commande',
          description: 'Les commandes peuvent être passées en visitant notre atelier à Bekasi ou en ligne via le chat WhatsApp ou les appels téléphoniques au numéro fourni.'
        },
        service: {
          title: 'Service',
          description: 'Si le produit commandé est un design personnalisé, veuillez nous soumettre le design pour notre examen. Il serait préférable qu\'il soit accompagné de plans de travail.'
        },
        production: {
          title: 'Production',
          description: 'Après négociation et accord sur le prix, nous créerons une facture PO avec les détails de votre commande.'
        },
        support: {
          title: 'Support',
          description: 'Le processus de production de commande anticipée prend environ 2-4 semaines selon le design et la quantité, nous mettrons à jour via Chat WhatsApp ou Email.'
        }
      },
      payment: {
        title: 'Paiement',
        deposit: {
          title: 'Acompte',
          description: 'La production commencera après avoir reçu un acompte minimum de 40% du montant total d\'achat ou par accord mutuel'
        },
        balancePayment: {
          title: 'Paiement du Solde',
          description: 'Pour les provinces de l\'île de Java et DKI Jakarta, le paiement du solde de certains montants peut être effectué lorsque les marchandises arrivent en montrant la preuve de transfert au chauffeur de livraison. Pour les zones en dehors de l\'île de Java, le paiement du solde est effectué lorsque les marchandises sont emballées et prêtes à être expédiées via un service d\'expédition.'
        }
      },
      shipping: {
        title: 'Expédition de Produits',
        jabodetabek: {
          title: 'Jabodetabek',
          days: '1-2 jours'
        },
        outsideJava: {
          title: 'En dehors de l\'île de Java',
          days: '5-7 jours'
        },
        international: {
          title: 'International',
          days: 'LCL/FCL'
        },
        note1: 'Les prix excluent les coûts d\'expédition sauf accord',
        note2: 'L\'annulation n\'est pas autorisée après le début de la production'
      },
      warranty: {
        title: 'Garantie Produit',
        badge: 'Garantie de 30 Jours',
        whatsCovered: {
          title: 'Ce Qui Est Couvert',
          description: 'Dommages de construction dus à des erreurs de main-d\'œuvre'
        },
        notCovered: {
          title: 'Non Couvert',
          description: 'Termites, changements de couleur, décoloration du tissu, expansion naturelle du bois'
        },
        note: {
          title: 'Note',
          description: 'Les coûts de ramassage et d\'expédition ne sont pas inclus'
        }
      },
      findUs: {
        title: 'Nous Trouver',
        workshopLabel: 'Atelier Bekasi :',
        workHours: 'Heures de Travail : 08h00 - 22h00 GMT +7',
        languages: 'Disponible en Bahasa Indonesia ou Anglais'
      }
    }
  },
  ko: {
    meta: {
      title: '서비스 약관 - Naturra Extal',
      description: 'Naturra Extal 프리미엄 산업용 스칸디나비아 가구 주문 서비스 약관'
    },
    hero: {
      title: '서비스 약관'
    },
    intro: 'Naturra Extal 프리미엄 산업용 스칸디나비아 가구 주문 서비스 약관',
    sections: {
      howToOrder: {
        title: '주문 방법',
        ordering: {
          title: '주문',
          description: 'Bekasi의 작업장을 방문하거나 제공된 번호로 WhatsApp 채팅 또는 전화를 통해 온라인으로 주문할 수 있습니다.'
        },
        service: {
          title: '서비스',
          description: '주문한 제품이 맞춤 디자인인 경우 검토를 위해 디자인을 제출해 주세요. 작업 도면을 첨부하면 더 좋습니다.'
        },
        production: {
          title: '생산',
          description: '협상 및 가격 합의 후 주문 세부사항이 포함된 PO 인보이스를 생성합니다.'
        },
        support: {
          title: '지원',
          description: '예약 주문 생산 프로세스는 디자인과 수량에 따라 약 2-4주가 소요되며 WhatsApp 채팅 또는 이메일로 업데이트합니다.'
        }
      },
      payment: {
        title: '결제',
        deposit: {
          title: '보증금',
          description: '구매 총액의 최소 40% 보증금을 받거나 상호 합의에 따라 생산을 시작합니다'
        },
        balancePayment: {
          title: '잔금 지불',
          description: '자바 섬 지방과 자카르타의 경우, 배송 기사에게 송금 증빙을 보여주면 상품 도착 시 일정 금액의 잔금을 지불할 수 있습니다. 자바 섬 외 지역의 경우 잔금은 상품이 포장되어 운송 서비스를 통해 출하 준비가 되었을 때 지불됩니다.'
        }
      },
      shipping: {
        title: '제품 배송',
        jabodetabek: {
          title: '자보데타벡',
          days: '1-2일'
        },
        outsideJava: {
          title: '자바 섬 외',
          days: '5-7일'
        },
        international: {
          title: '국제',
          days: 'LCL/FCL'
        },
        note1: '합의가 없는 한 가격에는 배송비가 포함되지 않습니다',
        note2: '생산 시작 후 취소는 허용되지 않습니다'
      },
      warranty: {
        title: '제품 보증',
        badge: '30일 보증',
        whatsCovered: {
          title: '보증 범위',
          description: '작업 오류로 인한 구조 손상'
        },
        notCovered: {
          title: '보증 제외',
          description: '흰개미, 색상 변화, 직물 퇴색, 자연 목재 팽창'
        },
        note: {
          title: '참고',
          description: '픽업 및 배송비는 포함되지 않습니다'
        }
      },
      findUs: {
        title: '우리를 찾으세요',
        workshopLabel: 'Bekasi 작업장:',
        workHours: '근무 시간: 08:00 - 22:00 GMT +7',
        languages: '인도네시아어 또는 영어로 제공'
      }
    }
  }
}

